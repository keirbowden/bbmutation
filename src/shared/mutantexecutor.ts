import {  getDirectoryEntries } from './files';
import { exec } from 'child_process';
import { promisify } from 'util';
import { copyFileSync, unlinkSync } from 'fs';
import { mkdtemp } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';
import { getElapsedTimeString } from './datetime';
const colors = require('colors/safe');

const executeMutants = async (ux, runAsUsername, classDir) => {
    const mutantDir=join(process.cwd(), 'mutants');
    const tmpDir=await mkdtemp(join(tmpdir(), 'bbmutant-'), {}
    );
    let killed=0;
    let suppressed=0;
    const mutants=getDirectoryEntries(mutantDir);
    const survived=[];
    const started=new Date().getTime();
    for (let idx=0; idx<mutants.length; idx++) {
        const mutant=mutants[idx];
        const clsPos=mutant.lastIndexOf('.cls');
        const className=mutant.substring(0, clsPos+4);

        copyFileSync(join(classDir, className),
                     join(tmpDir, className));

        console.log('Executing mutant ' + mutant);
        copyFileSync(join(mutantDir, mutant),
                     join(classDir, className));

        const execPromisfy = promisify(exec);

        try {
            
            //let { stdout, stderr } = await execPromisfy('sfdx force:source:legacy:push -f -u ' + runAsUsername);
    
            ux.startSpinner('Deploying');
            await execPromisfy('sfdx force:source:legacy:push -f -u ' + runAsUsername);
            ux.stopSpinner();

            try {
                // let { stdout, stderr } = await execPromisfy('sfdx force:apex:test:run -l RunLocalTests -u ' + runAsUsername + ' --synchronous');
                ux.startSpinner('Testing');
                await execPromisfy('sfdx force:apex:test:run -l RunLocalTests -u ' + runAsUsername + ' --synchronous');
                ux.stopSpinner();
                console.log(colors.red('Mutant survived'));
                survived.push(mutant);
            }
            catch (_exc) {
                console.log(colors.green('Mutant killed!'));
                killed++;
            }
            }
        catch (_exc) {
            console.log(colors.yellow('Mutant will not deploy - suppressing'));
            console.log(_exc);
            unlinkSync(join(mutantDir, mutant));
            suppressed++;
        }

        copyFileSync(join(tmpDir, className),
                    join(classDir, className));

        ux.log('\n---------------------------------------------------------------');
        ux.log('Executed ' + (idx + 1) + ' mutant(s): Killed ' + killed + ', Survived ' + survived.length + ', Suppressed '  + suppressed);
        ux.log('---------------------------------------------------------------\n');
    }

    ux.log('\nExecution complete in ' + getElapsedTimeString(started) + '\n');
    ux.log('Total      : ' + mutants.length);
    ux.log('Killed     : ' + killed);
    ux.log('Survived   : ' + survived.length);
    ux.log('Suppressed : ' + suppressed);
    const mutationScore=(((killed - suppressed) / mutants.length) * 100).toFixed(2);
    console.log('\n' + colors.cyan('Mutant score = ' + mutationScore));
    if (survived.length>0) {
        console.log('\n\n' + colors.red('The following mutants survived:'));
        for (const mutant of survived) {
            console.log(colors.red('    ' + mutant));
        }
    }
}

export { executeMutants }