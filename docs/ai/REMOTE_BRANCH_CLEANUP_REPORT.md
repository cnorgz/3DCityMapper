# Remote Branch Cleanup Report (Report Only)

## Scope
- Generated from `origin` after publish/hygiene steps.
- This file proposes cleanup candidates only.
- No branch deletions were executed.

## Commands Run
```bash
git fetch origin --prune
git branch -r --merged origin/master | sed 's|origin/||' | sort
git branch -r | sed 's|origin/||' | sort
```

## Remote Branches Merged Into `origin/master`
```text
master
refactor/phase1-config-utils
refactor/phase10b-example-city-entry
```

## Candidate Cleanup Branches (Pattern Match)
Criteria applied:
- include: `refactor/phase*`, `chore/*`, `refactor/merge-candidate*`
- exclude: `master`

Candidates:
- `refactor/phase1-config-utils`
- `refactor/phase10b-example-city-entry`

## Suggested Delete Commands (NOT EXECUTED)
```bash
git push origin --delete refactor/phase1-config-utils
git push origin --delete refactor/phase10b-example-city-entry
```

## Notes
- `origin/chore/archive-ai-review-packets` is intentionally retained for PR review.
- Re-run this report before deletion if more branches are merged meanwhile.
