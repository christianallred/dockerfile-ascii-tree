import { AsciiTree , Printer} from 'oo-ascii-tree';

export class CustomAsciiTree extends AsciiTree{
    
    private readonly _customchildren = new Array<AsciiTree>();

    constructor(text?: string, ...children: AsciiTree[]){
        super(text, ...children)
        for (const child of children) {
            this.add(child);
        }
    }

    public printTree(output: Printer = process.stdout) {
    let ancestorsPrefix = '';

    for (const parent of this.ancestors) {
      // -1 represents a "hidden" root, and so it's children
      // will all appear as roots (level 0).
      if (parent.level <= 0) {
        continue;
      }

      if (parent.last) {
        ancestorsPrefix += '  ';
      } else {
        ancestorsPrefix += ' │';
      }
    }

    let myPrefix = '';
    let multilinePrefix = '';
    if (this.level > 0) {
      if (this.last) {
        if (!this.empty) {
          myPrefix += ' └─┬ ';
          multilinePrefix += ' └─┬ ';
        } else {
          myPrefix += ' └── ';
          multilinePrefix = '     ';
        }
      } else {
        if (!this.empty) {
          myPrefix += ' ├─┬ ';
          multilinePrefix += ' │ │ ';
        } else {
          myPrefix += ' ├── ';
          multilinePrefix += ' │   ';
        }
      }
    }

    if (this.text) {
      output.write('#')
      output.write(ancestorsPrefix);
      output.write(myPrefix);
      const lines = this.text.split('\n');
      output.write(lines[0]);
      output.write('\n');

      for (const line of lines.splice(1)) {
        output.write('#')
        output.write(ancestorsPrefix);
        output.write(multilinePrefix);
        output.write(line);
        output.write('\n');
      }
    }

    for (const child of this._customchildren) {
      child.printTree(output);
    }
  }

  public add(...children: AsciiTree[]) {
    for (const child of children) {
      child.parent = this;
      this._customchildren.push(child);
    }
  }

}