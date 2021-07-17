build:
	docker build -t dockerfile-ascii-tree --target=run . 

# this command can be called like `make inject FILE=Dockerfile
inject: 
	cat ${FILE} | docker run -i dockerfile-ascii-tree >> ${FILE}