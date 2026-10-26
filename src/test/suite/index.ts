import * as path from 'path';
import { readdirSync } from 'fs';
import * as Mocha from 'mocha';

/**
 * Compiled test files below the given root.
 * Uses the node recursive readdir so the suite needs no glob dependency.
 */
function findTestFiles(testsRoot: string): string[] {
	return readdirSync(testsRoot, { recursive: true, encoding: 'utf8' })
		.filter(file => file.endsWith('.test.js'));
}

export function run(): Promise<void> {
	// Create the mocha test
	const mocha = new Mocha({
        ui: 'tdd',
        color: true
	});

	const testsRoot = path.resolve(__dirname, '..');

	// Add files to the test suite
	findTestFiles(testsRoot).forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

	return new Promise((c, e) => {
		try {
			// Run the mocha test
			mocha.run(failures => {
				if (failures > 0) {
					e(new Error(`${failures} tests failed.`));
				} else {
					c();
				}
			});
		} catch (err) {
			console.error(err);
			e(err);
		}
	});
}
