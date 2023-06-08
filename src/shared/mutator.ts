import {join} from 'path';
import {readFileSync, writeFileSync} from 'fs';

const ifOps=['>', '<', '<=', '>=', '==', '!='];
const subtractOneOps=['+1', '-5', '+5'];

const mutateClass = (classDir, className, mutantDir, mutantCount, config) => {
    const fullClassName=join(classDir, className);
    const body=''+readFileSync(fullClassName);
    if (!body.toLowerCase().includes('@istest')) {
        const lines=body.split(/\r\n|\n/);
        let startPos=0;
        let maxMutants=config.maxMutantsPerFile;
        if (-1!=maxMutants) {
            startPos=Math.floor(Math.random()*lines.length);
        }
        else {
            maxMutants=100000;
        }

        let mutantsForFile=0;
        const origCount=mutantCount;
        for (let lineIdx=startPos; lineIdx<lines.length+startPos && mutantsForFile<maxMutants; lineIdx++) {
            const lineNo=lineIdx%lines.length;
            const line=lines[lineNo];

            const mutations=['If', 'SubtractOne', 'Increment', 'RemoveDML'];
            if (config.strings.length>0){
                mutations.push('Strings');
            }
            if (config.values.length>0){
                mutations.push('Values');
            }
            
            const startMutationPos=Math.floor(Math.random()*mutations.length);
            for (let mutationIdx=startMutationPos; mutationIdx<mutations.length+startMutationPos && mutantsForFile<maxMutants; mutationIdx++) {
                switch (mutations[mutationIdx%mutations.length]) {
                    case 'If':
                        mutantCount=processIf(lineNo, line, lines, className, mutantDir, mutantCount);
                        break;
                    case 'SubtractOne':
                        mutantCount=processSubtractOne(lineNo, line, lines, className, mutantDir, mutantCount);
                        break;
                    case 'Increment':
                        mutantCount=processIncrement(lineNo, line, lines, className, mutantDir, mutantCount);
                        break;
                    case 'Strings':
                        mutantCount=processStrings(lineNo, line, lines, className, mutantDir, mutantCount, config.strings);
                        break;
                    case 'Values':
                        mutantCount=processValues(lineNo, line, lines, className, mutantDir, mutantCount, config.values);
                        break;
                    case 'RemoveDML':
                        mutantCount=processRemoveDML(lineNo, line, lines, className, mutantDir, mutantCount);
                        break;
                }
                mutantsForFile=mutantCount-origCount;
            }

        }
    }

    return mutantCount;
}

function processIf(lineNo, line, lines, className, mutantDir, mutantCount) {
    if (line.includes(' if')) {
        if (line.includes('null')) {
            mutantCount=processIfNull(lineNo, line, lines, className, mutantDir, mutantCount);
        }
        else {
            for (let opIdx=0; opIdx<ifOps.length; opIdx++) {
                const op=ifOps[opIdx];
                if (line.includes(op)) {
                    let replaceIdx=Math.floor(Math.random()*ifOps.length);
                    if (replaceIdx==opIdx) {
                        replaceIdx=(replaceIdx+1)%ifOps.length;
                    }          
                    mutantCount++;
                    const mutantLine=line.replace(op, ifOps[replaceIdx]);
                    const linesClone=lines.map((x)=>x);
                    linesClone[lineNo]=mutantLine;
                    mutantDetails(lineNo, line, mutantLine, linesClone);
                    const mutantBody=linesClone.join('\n');
                    writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
                    break;
                }
            }
        }
        //console.log(lineNo + ' ' + line);
    }

    return mutantCount;
}

function processSubtractOne(lineNo, line, lines, className, mutantDir, mutantCount) {
    if (line.includes('+ 1')) {
        for (let opIdx=0; opIdx<subtractOneOps.length; opIdx++) {
            const op=subtractOneOps[opIdx];
            if (line.includes(op)) {
                let replaceIdx=Math.floor(Math.random()*subtractOneOps.length);
                if (replaceIdx==opIdx) {
                    replaceIdx=(replaceIdx+1)%subtractOneOps.length;
                }          
                mutantCount++;
                const mutantLine=line.replace(op, subtractOneOps[replaceIdx]);
                const linesClone=lines.map((x)=>x);
                linesClone[lineNo]=mutantLine;
                mutantDetails(lineNo, line, mutantLine, linesClone);
                const mutantBody=linesClone.join('\n');
                writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
                break;
            }
        }
    }

    return mutantCount;
}

function processIfNull(lineNo, line, lines, className, mutantDir, mutantCount) {
    const lineNoWS=line.replace(/\s+/g, '');
    let mutantLine=null;
    if ( (lineNoWS.includes('null==')) || (lineNoWS.includes('==null'))) {
        mutantLine=line.replace('==', '!=');
    }
    else if ( (lineNoWS.includes('null!=')) || (lineNoWS.includes('!=null'))) {
        mutantLine=line.replace('!=', '==');
    }

    if (null!=mutantLine) {
        mutantCount++;
        const linesClone=lines.map((x)=>x);
        linesClone[lineNo]=mutantLine;
        mutantDetails(lineNo, line, mutantLine, linesClone);
        const mutantBody=linesClone.join('\n');
        writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
    }

    return mutantCount;
}

function processIncrement(lineNo, line, lines, className, mutantDir, mutantCount) {
    if (line.includes('++')) {
        mutantCount++;
        const mutantLine=line.replace('++', '+=2');
        const linesClone=lines.map((x)=>x);
        linesClone[lineNo]=mutantLine;
        mutantDetails(lineNo, line, mutantLine, linesClone);
        const mutantBody=linesClone.join('\n');
        writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
    }

    return mutantCount;
}

function processStrings(lineNo, line, lines, className, mutantDir, mutantCount, strings) {
    const startPos=Math.floor(Math.random()*strings.length);
    for (let idx=startPos; idx<strings.length+startPos; idx++) {
        const string='\'' + strings[idx%strings.length] + '\'';
        //console.log('Looking for ' + string + ' in line ' + line);
        if (line.includes(string)) {
            mutantCount++;
            const mutantLine=line.replace(string, getReplacementString(string));
            const linesClone=lines.map((x)=>x);
            linesClone[lineNo]=mutantLine;
            mutantDetails(lineNo, line, mutantLine, linesClone);
            const mutantBody=linesClone.join('\n');
            writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
            //console.log('File = ' + join(mutantDir, className + mutantCount));
            break;
        }
    }

    return mutantCount;
}

function getReplacementString(origStr) {
    let replacementString='\'';
    for (let idx=0; idx<origStr.length-2; idx++) {
        replacementString+=String.fromCharCode(64+Math.floor(Math.random()*26));
    }
    replacementString+='\'';

    return replacementString
}

function processValues(lineNo, line, lines, className, mutantDir, mutantCount, values) {
    const startPos=Math.floor(Math.random()*values.length);
    for (let idx=startPos; idx<values.length+startPos; idx++) {
        const value=values[idx%values.length];
        if (line.includes(value)) {
            mutantCount++;
            const mutantLine=line.replace(value, Math.floor(Math.random()*500000));
            const linesClone=lines.map((x)=>x);
            linesClone[lineNo]=mutantLine;
            mutantDetails(lineNo, line, mutantLine, linesClone);
            const mutantBody=linesClone.join('\n');
            writeFileSync(join(mutantDir, className + mutantCount), mutantBody);

            break;
        }
    }

    return mutantCount;
}

function processRemoveDML(lineNo, line, lines, className, mutantDir, mutantCount) {
    const lineTrim=line.trim();
    if ( (lineTrim.startsWith('insert ')) ||
         (lineTrim.startsWith('update ')) ||
         (lineTrim.startsWith('delete ')) ) {
        mutantCount++;
        const linesClone=lines.map((x)=>x);
        linesClone.splice(lineNo, 1);
        mutantDetails(lineNo, line, '<deleted>', linesClone);
        const mutantBody=linesClone.join('\n');
        writeFileSync(join(mutantDir, className + mutantCount), mutantBody);
    }

    return mutantCount;
}


function mutantDetails(lineNo, orig, mutant, allLines) {
    allLines.unshift('*/');
    allLines.unshift('   to  :  ' + mutant);
    allLines.unshift('   from:  ' + orig);
    allLines.unshift('   mutated line ' + (lineNo + 6));
    allLines.unshift('/*');
}

export { mutateClass }