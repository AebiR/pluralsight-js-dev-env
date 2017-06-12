$CommitComment = Read-Host -Prompt 'Comment'
nsp check
git add .
git commit -m $CommitComment
git push
