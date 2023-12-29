export type FileNameModifier = (name: string) => string;

const appendDateModifier: FileNameModifier = name => {
    const [fileName, fileExtension] = name.split('.')

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${fileName}_${year}-${month}-${day}.${fileExtension}`;
}

export function download(blob: Blob, name: string, fileNameModifier: FileNameModifier | null = appendDateModifier) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileNameModifier ? fileNameModifier(name) : name;
    link.click();
    URL.revokeObjectURL(url);
}