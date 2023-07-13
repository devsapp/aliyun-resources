echo "Count the number of commits submitted by each user:"
git shortlog -sn --no-merges | gawk '{ printf "%s: %s\n", $2, $1 }' | sort -rn

echo "\nCount the number of lines of code written by each user:"
git log --author="rsonghuster" --pretty=tformat: --numstat | gawk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "rsonghuster ==> added lines: %s removed lines: %s total lines: %s\n",add,subs,loc }' -