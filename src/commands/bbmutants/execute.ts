import { findSubdirectory } from '../../shared/files';
import * as os from 'os';
import * as _ from 'lodash';
import { flags, SfdxCommand } from '@salesforce/command';
//import { Messages, SfError } from '@salesforce/core';
import { Messages } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { executeMutants } from '../../shared/mutantexecutor';
import { SfProject } from '@salesforce/core';

// Initialize Messages with the current plugin directory
Messages.importMessagesDirectory(__dirname);

// Load the specific messages for this file. Messages from @salesforce/command, @salesforce/core,
// or any library that is using the messages framework can also be loaded this way.
const messages = Messages.loadMessages('bbmutation', 'execute');

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
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = true;

  // Comment this out if your command does not support a hub org username
  // protected static supportsDevhubUsername = true;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<AnyJson> {
    let dir = this.flags.dir;

    const sfProject = await SfProject.resolve();
    if (dir==undefined) {
      dir=findSubdirectory(sfProject.getDefaultPackage().fullPath, 'classes');
    }

    const username=this.org.getUsername();

    if (null===dir) {
      console.log('Unable to find classes - are you in the right  directory?');
    }
    else {
      executeMutants(this.ux, username, dir);
    }

    return { success: true };
  }
}
