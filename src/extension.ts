
//
// ─── IMPORTS ────────────────────────────────────────────────────────────────────
//

	import * as vscode
		from "vscode"
	import { formatIDF }
		from "idf-formatter"

//
// ─── FORMAT ─────────────────────────────────────────────────────────────────────
//

	export function formatWithIDFFormatter ( document: vscode.TextDocument ) {

		const start =
			new vscode.Position( 0, 0 );
		const end =
			new vscode.Position( document.lineCount - 1, document.lineAt( document.lineCount - 1 ).text.length )
		const docRange =
			new vscode.Range( start, end )
		const result =
			new Array<vscode.TextEdit>( )
		const content =
			document.getText( docRange )

		const formatted =
			formatIDF( content )

		result.push( new vscode.TextEdit( docRange, formatted ) )
		return result
	}

//
// ─── REGISTRATION ───────────────────────────────────────────────────────────────
//

	// this method is called when your extension is activated
	// your extension is activated the very first time the command is executed
	export function activate ( context: vscode.ExtensionContext ) {
		registerFormatter( context )
	}

//
// ─── FUNCTION REGISTER FORMATTER ────────────────────────────────────────────────
//

	function registerFormatter ( context: vscode.ExtensionContext ) {
		context.subscriptions.push(
			vscode.languages.registerDocumentFormattingEditProvider( "energyplus", {
				provideDocumentFormattingEdits: ( document, options, token ) =>
					formatWithIDFFormatter( document )
			})
		)

		context.subscriptions.push(
			vscode.languages.registerDocumentRangeFormattingEditProvider( "energyplus", {
				provideDocumentRangeFormattingEdits: ( document, range, options, token ) =>
					formatWithIDFFormatter( document )
			})
		)
	}

// ────────────────────────────────────────────────────────────────────────────────