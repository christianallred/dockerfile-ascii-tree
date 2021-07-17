# Dockerfile Ascii 
Docker tree builder is a utility docker image for annotating complex multistage Dockerfiles. The container will output 
to standard out a tree structure decsribing the shape of your dockerfile.  

### Basic Example

given a docker file of this shape. 

```Dockerfile
FROM python:3.9.2-slim-buster as image-one
...
FROM image-one as image-two
...
FROM image-two AS image-three
...
FROM compile-image as image-four
...
FROM image-four as image-five
...
FROM image-four as image-sixe
...
FROM image-five as image-seven
...
FROM image-seven as test-image
...
FROM image-seven as doc-image
...
```

A map would be created like this

```bash
#-------------------------------------------------------------#
# Auto generated docker tree built from dockerfile-ascii-tree #
#-------------------------------------------------------------#

image-one
 └─┬ image-two
   └── image-three
image-four
 ├─┬ image-five
 │ └─┬ image-seven
 │   ├── test-image
 │   └── doc-image
 └── image-sixe
```

### Direct Injection

You can directly inject this into your docker file by running command like 
`cat Dockerfile | docker run -i dockerfile-ascii-tree >> Dockerfile`

