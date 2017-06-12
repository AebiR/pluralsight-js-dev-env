$CommitComment = Read-Host -Prompt 'Comment'
git add .
git commit -m $CommitComment
git push