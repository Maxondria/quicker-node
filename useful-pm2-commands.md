## Cluster with how many cores you find on the machine (Start 4 separate instances of my application)

`pm2 start index.js -i 0`

## List all available clusters

`pm2 list`

## Learn about an instance in detail

`pm2 show index`

## stop all clusters at once

`pm2 delete index`
