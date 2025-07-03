FROM docker.io/node:18.20-buster
ADD . .
CMD [ "node", "index.js" ]

# docker build --platform linux/amd64 -t quay.io/linxianer12/erp-mock:hospital .
# docker push quay.io/linxianer12/erp-mock:hospital
# docker run -p 3000:3000 quay.io/linxianer12/erp-mock:hospital