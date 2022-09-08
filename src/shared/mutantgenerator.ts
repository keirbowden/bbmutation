import { createDirectory, getDirectoryEntries } from './files';
import { join } from 'path';
import { mutateClass } from './mutator';

const generateMutants = (ux, dir, config) => {
    const mutantDir=join(process.cwd(), 'mutants');
    createDirectory(mutantDir);

    const allClassFiles=getDirectoryEntries(dir);

    let mutantCount=0;
    for (const classFile of allClassFiles) {
        if (classFile.endsWith('.cls')) {
            // check whether we should process the file - if the target list is defined it should come from there
            let process=(config.targetFileList.length==0);
            if (!process) {
                //console.log('Looking for ' + classFile.substring(0, classFile.length-4) + ' in ' + JSON.stringify(config.targetFileList));
                if (config.targetFileList.includes(classFile.substring(0, classFile.length-4))) {
                    process=true;
                }
            }
            if (process) {
                // console.log('Processing file ' + classFile);
                mutantCount=mutateClass(dir, classFile, mutantDir, mutantCount, config);
            }
        }
    }

    ux.log('Generated ' + mutantCount + ' mutants');
}

export { generateMutants }
