#!/usr/bin/env bash
set -euo pipefail

repo_root="$(git rev-parse --show-toplevel)"
out_file="${1:-docs/ai/audit_md_links_phase12.txt}"

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
  echo "# Markdown Link Audit (Phase 12)"
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
