export const ignoreList = [
    '.git', 
    'node_modules'
];

export const includeExts = [
    '.js',
    '.jsx',
    '.ts',
    '.tsx',
    '.py',
    '.c',
    '.cpp',
    '.dart',
    '.ipynb'
];

export const ext2Lang: { [key: string]: string } = {
    '.js': 'javascript', 
    '.jsx': 'javascript', 
    '.ts': 'typescript', 
    '.tsx': 'typescript', 
    '.py': 'python', 
    '.ipynb': 'python', 
    '.c': 'C', 
    '.cpp': 'C++', 
    '.dart': 'dart'
};