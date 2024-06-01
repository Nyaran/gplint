import {expect} from 'chai';
import mockFs from 'mock-fs';
import * as sinon from 'sinon';
import * as configParser from '../../src/config-parser.js';
import { SinonSpy } from 'sinon';

describe('Configuration parser', function () {
  beforeEach(function () {
    if (this.sinon == null) {
      this.sinon = sinon.createSandbox();
    } else {
      this.sinon.restore();
    }
  });

  let consoleErrorStub: sinon.SinonStubbedMember<typeof console.error>;
  let processExitStub: sinon.SinonStubbedMember<typeof process.exit>;
  beforeEach(function () {
    consoleErrorStub = this.sinon.stub(console, 'error');
    processExitStub = this.sinon.stub(process, 'exit');
  });

  afterEach(function () {
    consoleErrorStub.restore();
    processExitStub.restore();
    mockFs.restore();
  });

  describe('early exits with a non 0 exit code when', function () {
    it('the specified config file doesn\'t exit', async function () {
      const configFilePath = './non/existing/path';
      await configParser.getConfiguration(configFilePath);

      const consoleErrorArgs = consoleErrorStub.args.map(function (args) {
        return args[0];
      });
      expect(consoleErrorArgs[0]).to.include(`Could not find config file "${configFilePath}" in the working directory`);
      expect(processExitStub.args[0][0]).to.equal(1);
    });

    it('no config file has been specified and default config file doesn\'t exist', async function () {
      mockFs({});
      await configParser.getConfiguration();

      const consoleErrorArgs = consoleErrorStub.args.map(function (args) {
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Could not find config file ".gplintrc" in the working directory');
      expect(processExitStub.args[0][0]).to.equal(1);
    });

    it('a bad configuration file is used', async function () {
      const configFilePath = 'test/config-parser/bad_config.gplintrc';
      await configParser.getConfiguration(configFilePath);

      const consoleErrorArgs = consoleErrorStub.args.map(function (args) {
        return args[0];
      });

      expect(consoleErrorArgs[0]).to.include('Error(s) in configuration file:');
      expect(processExitStub.args[0][0]).to.equal(1);
    });
  });

  describe('doesn\'t exit with exit code 1 when', function () {
    it('a good configuration file is used', async function () {
      const configFilePath = 'test/config-parser/good_config.gplintrc';
      const parsedConfig = await configParser.getConfiguration(configFilePath);
      sinon.assert.neverCalledWith(process.exit as SinonSpy<[number], never>, 1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(parsedConfig).to.deep.eq({'no-files-without-scenarios': 'off'});
    });

    it('a good configuration file is used that includes comments', async function () {
      const configFilePath = 'test/config-parser/good_config_with_comments.gplintrc';
      const parsedConfig = await configParser.getConfiguration(configFilePath);
      sinon.assert.neverCalledWith(process.exit as SinonSpy<[number], never>, 1); // eslint-disable-line @typescript-eslint/unbound-method
      expect(parsedConfig).to.deep.eq({'no-files-without-scenarios': 'off'});
    });

    it('the default configuration file is found', async function () {
      mockFs({
        '.gplintrc': '{}',
      });

      await configParser.getConfiguration();
      sinon.assert.neverCalledWith(process.exit as SinonSpy<[number], never>, 1); // eslint-disable-line @typescript-eslint/unbound-method
    });
  });
});
