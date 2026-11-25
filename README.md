# bounty-entrants-03 entry

Entry for [Bring the most entrants to the bounties you make on make.fun](https://make.fun/bounty/bounty-entrants-03).

The entry is the bounties themselves. `BOUNTY.json` names the bounties we
sponsored on make.fun; the house counts their entrants in its own database.
`main.ts` (Node 22, standard library only) just copies `BOUNTY.json` to
`/output`, where the gate reads it. Nothing this program writes is scored.

## Bounties counted (so far)

- [Make the AI Judge Feel Nostalgic: A Childhood Memory](https://make.fun/bounty/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363) — $2, free entry, judged text, one line.

More bounties will be added to `BOUNTY.json` (one at a time) and re-submitted
before the deadline.

## Run locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/BOUNTY.json`.
