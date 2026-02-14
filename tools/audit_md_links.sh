#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
out_file="/tmp/audit_md_links.txt"

usage() {
  echo "Usage:"
  echo "  bash tools/audit_md_links.sh [--out <path>]"
  echo "  bash tools/audit_md_links.sh [<path>]"
}

if [[ $# -gt 0 ]]; then
  case "$1" in
    --out)
      if [[ $# -lt 2 ]]; then
        usage
        exit 2
      fi
      out_file="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      out_file="$1"
      shift
      ;;
  esac
fi

if [[ $# -gt 0 ]]; then
  usage
  exit 2
fi

cd "$repo_root"

tmp_links="$(mktemp)"
tmp_missing="$(mktemp)"
trap 'rm -f "$tmp_links" "$tmp_missing"' EXIT

# Capture obvious intra-repo markdown links of the forms ](./...) and ](/docs/...)
rg -n --no-heading -o '\]\((\./[^)#]+|/docs/[^)#]+)' -g '*.md' . > "$tmp_links" || true

while IFS=: read -r file line _ match; do
  raw_target="${match#](}"
  target="${raw_target%)}"
  target="${target%%#*}"
  target="${target%%\?*}"
  [[ -z "$target" ]] && continue

  if [[ "$target" == /docs/* ]]; then
    resolved=".${target}"
  elif [[ "$target" == ./* ]]; then
    dir="$(dirname "$file")"
    resolved="$dir/${target#./}"
  else
    continue
  fi

  if [[ ! -f "$resolved" ]]; then
    printf '%s:%s -> %s (resolved: %s)\n' "$file" "$line" "$target" "$resolved" >> "$tmp_missing"
  fi
done < "$tmp_links"

{
  echo "# Markdown Link Audit"
  echo
  echo "repo_root=$repo_root"
  echo "scan_patterns=](./...) and ](/docs/...)"
  echo
  if [[ -s "$tmp_missing" ]]; then
    echo "status=FAIL"
    echo
    echo "## Missing Targets"
    sort -u "$tmp_missing"
  else
    echo "status=PASS"
    echo
    echo "No missing targets found for scanned patterns."
  fi
} > "$out_file"

echo "audit_output=$out_file"
