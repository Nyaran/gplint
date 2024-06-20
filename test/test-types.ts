import * as sinon from 'sinon';

declare module 'mocha' {
	export interface Context {
		sinon?: sinon.SinonSandbox;
	}
}
