import { findSubdirectory } from '../../shared/files';
import * as os from 'os';
import * as _ from 'lodash';
import { flags, SfdxCommand } from '@salesforce/command';
//import { Messages, SfError } from '@salesforce/core';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { generateMutants } from '../../shared/mutantgenerator';
import { SfProject } from '@salesforce/core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('bbmutation', 'mutate');

export default class Mutate extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = messages.getMessage('examples').split(os.EOL);

  public static args = [{ name: 'file' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    dir: flags.string({
      char: 'd',
      description: messages.getMessage('dirFlagDescription'),
    }),
    targetfiles: flags.string({
      char: 't',
      description: messages.getMessage('targetFilesFlagDescription')
    }),
    maxmutantsperfile: flags.string({
      char: 'm',
      description: messages.getMessage('maxMutantsFlagDescription')
    }),
    strings: flags.string({
      char: 's',
      description: messages.getMessage('stringsFlagDescription')
    }),
    values: flags.string({
      char: 'v',
      description: messages.getMessage('valuesFlagDescription')
    })
  };

  // Comment this out if your command does not require an org username
  // protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    const targetFiles = this.flags.targetfiles || '';
    const targetFileList = targetFiles.split(' ').filter(i=>i);
    const maxMutantsPerFile = this.flags.maxmutantsperfile||-1;
    const strings = this.flags.strings || '';
    const stringsList = strings.split(' ').filter(i=>i);
    const values = this.flags.values || '';
    const valuesList = values.split(' ').filter(i=>i);

//    console.log('Target file list = ' + JSON.stringify(targetFileList));
    let dir = this.flags.dir;
    const sfProject = await SfProject.resolve();
    if (dir==undefined) {
      dir=findSubdirectory(sfProject.getDefaultPackage().fullPath, 'classes');
    }

    if (null===dir) {
      this.ux.log('Unable to find classes - are you in the right  directory?');
    }
    else {
        this.ux.log('Mutating classes in directory ' + dir);
        const config={targetFileList: targetFileList,
                      maxMutantsPerFile: maxMutantsPerFile,
                      strings: stringsList,
                      values: valuesList};
      
        generateMutants(this.ux, dir, config);
    }

    return { success: true };
  }
}
