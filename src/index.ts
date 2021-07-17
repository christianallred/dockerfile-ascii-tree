import { AsciiTree } from 'oo-ascii-tree';
var stream = require('stream');

interface IDockerImage {
    id: string
    parentId: string
    from: string
    children?: IDockerImage[]
}

function listToTree(list: IDockerImage[]): IDockerImage[] {
    var map = {}, node, roots = [], i
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i
      list[i].children = []
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i]
      if (node.parentId) {
        list[map[node.parentId]].children.push(node)
      } else {
        roots.push(node)
      }
    }
    return roots;
}

const generateInitialDockerImage = (string: string): IDockerImage => {
    const splitString = string.split(" ")
    let newDockerImage: IDockerImage = {
        id: splitString[1],
        parentId: splitString[1],
        from: splitString[1]
    }
    if (splitString[2] && splitString[2].toLocaleLowerCase() == "as"){
        newDockerImage.id = splitString[3]
    }
    return newDockerImage
} 


let images: IDockerImage[] = []
process.argv.forEach(function (val, index, array) {
    // the first two lines of process argv is bullshit
    if (index > 1){
        images.push(generateInitialDockerImage(val))
    }
});

images.forEach(image => {
        if (!images.find(findimage => findimage.id === image.parentId)){
            image.parentId = null
        }
    }
)


const buildAsciiTree = (treeOfImages: IDockerImage[]) : AsciiTree[] => {
    treeOfImages.forEach(branch => {
        if (branch.children){
            return buildAsciiTree(branch.children)
        }
    })
    return treeOfImages.map(branch => new AsciiTree(branch.id, ...buildAsciiTree(branch.children)))
}


let treeOfImages = listToTree(images)

const ascii = buildAsciiTree(treeOfImages)

console.log('')
console.log("#-----------------------------------------------------------#")
console.log('# Auto generated docker tree built from docker-tree-builder #')
console.log("#-----------------------------------------------------------#")
console.log('')

ascii.forEach(tree => tree.printTree()) 