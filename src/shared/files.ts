import { mkdirSync, rmdirSync, statSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';
import { platform } from 'process';

const fileExists = (pathname) => {
    let result=true;
    try {
        statSync(pathname);
    } catch (_e) {
        result=false;
    }

    return result;
}

const getDirectoryEntries = (pathname) => {
    let result:Array<string>=[];
    if ( (fileExists(pathname)) && (lstatSync(pathname).isDirectory()) ) {
        result=readdirSync(pathname);
    }

    return result;
}

const findSubdirectory = (pathname, subDirname) => {
    //console.log('Finding subdirectory ' + subDirname + ' in ' + pathname);
    let location=null;

    const entries=getDirectoryEntries(pathname);
    for (let idx=0; idx<entries.length && null==location; idx++) {
        const entry=entries[idx];
        //console.log('Entry = ' + entry);
        const fullEntryName=join(pathname, entry);
        if (entry==subDirname) {
            location=fullEntryName;
        }
        else if (lstatSync(fullEntryName).isDirectory) {
            location=findSubdirectory(fullEntryName, subDirname);           
         }
    }

    return location;
} 

const createDirectory = (pathname) => {
    if (fileExists(pathname)) {
        rmdirSync(pathname, {recursive: true});
    }
    mkdirSync(pathname);

}

const getSFDXExecutable = () => {
    let sfdxExe='sf';
    if (platform=="win32") {
        sfdxExe='sf.cmd';
    }

    return sfdxExe;
}

export { createDirectory, getDirectoryEntries, findSubdirectory, getSFDXExecutable }