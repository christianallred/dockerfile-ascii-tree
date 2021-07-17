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

#-----------------------------------------------------------#
# Auto generated docker tree built from docker-tree-builder #
#-----------------------------------------------------------#

image-one
 └─┬ image-two
   └── image-three
image-four
 ├─┬ image-five
 │ └─┬ image-seven
 │   ├── test-image
 │   └── doc-image
 └── image-sixe
