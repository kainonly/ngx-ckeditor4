export interface CkeditorConfigInterface {
  /**
   * Allowed content rules. This setting is used when instantiating CKEDITOR.editor.filter.
   */
  allowedContent?: string | boolean;

  /**
   * Specifies the widget to use to automatically embed a link.
   * The default value of this option defines that either the Media Embed or Semantic Media Embed widgets will be used,
   * depending on which is enabled.
   */
  autoEmbed_widget?: string | Function;

  /**
   * Extra vertical space to be added between the content and
   * the editor bottom bar when adjusting editor height to content by using the Auto Grow feature.
   * This option accepts a value in pixels, without the unit (for example: 50).
   */
  autoGrow_bottomSpace?: number;

  /**
   * The maximum height that the editor can assume when adjusting to content by using the Auto Grow feature.
   * This option accepts a value in pixels, without the unit (for example: 600).
   * Zero (0) means that the maximum height is not limited and the editor will expand infinitely.
   */
  autoGrow_maxHeight?: number;

  /**
   * The minimum height that the editor can assume when adjusting to content by using the Auto Grow feature.
   * This option accepts a value in pixels, without the unit (for example: 300).
   */
  autoGrow_minHeight?: number;

  /**
   * Whether automatic editor height adjustment brought by the Auto Grow feature should happen on editor creation.
   */
  autoGrow_onStartup?: boolean;

  /**
   * Whether the element replaced by the editor (usually a <textarea>) is to be updated automatically when posting the form containing the editor.
   */
  autoUpdateElement?: boolean;

  /**
   * The autocomplete keystrokes used to finish autocompletion with the selected view item.
   * This setting will set completing keystrokes for each autocomplete plugin respectively.
   */
  autocomplete_commitKeystrokes?: number | number[];

  /**
   * The Auto Link plugin keystrokes used to finish link completion.
   */
  autolink_commitKeystrokes?: number | number[];

  /**
   * Regex used by the Auto Link plugin to match email adresses.
   */
  autolink_emailRegex?: RegExp;

  /**
   * Regex used by the Auto Link plugin to match URL adresses.
   */
  autolink_urlRegex?: RegExp;

  /**
   * The base Z-index for floating dialog windows and popups.
   */
  baseFloatZIndex?: number;

  /**
   * The base href URL used to resolve relative and absolute URLs in the editor content.
   */
  baseHref?: string;

  /**
   * Whether to escape basic HTML entities in the document, including:
   */
  basicEntities?: boolean;

  /**
   * The keystrokes that are blocked by default as the browser implementation is buggy.
   * These default keystrokes are handled by the editor.
   */
  blockedKeystrokes?: any[];

  /**
   * Sets the class attribute to be used on the body element of the editing area.
   * This can be useful when you intend to reuse the original CSS file you are using on your live website and
   * want to assign the editor the same class as the section that will include the contents.
   * In this way class-specific CSS rules will be enabled.
   */
  bodyClass?: string;

  /**
   * Sets the id attribute to be used on the body element of the editing area.
   * This can be useful when you intend to reuse the original CSS file you are using on your live website and
   * want to assign the editor the same ID as the section that will include the contents.
   * In this way ID-specific CSS rules will be enabled.
   */
  bodyId?: string;

  /**
   * Whether to show the browser native context menu when the Ctrl or Meta (Mac) key is pressed on opening the context menu with
   * the right mouse button click or the
   */
  browserContextMenuOnCtrl?: boolean;

  /**
   * The default content type that is used when pasted data cannot be clearly recognized as HTML or text.
   */
  clipboard_defaultContentType?: 'html' | 'text';

  /**
   * Duration of the notification displayed after pasting was blocked by the browser.
   */
  clipboard_notificationDuration?: number;

  /**
   * The URL to the security token endpoint in your application.
   * The role of this endpoint is to securely authorize the end users of your application to use CKEditor Cloud Services,
   * only if they should have access e.g. to upload files with Easy Image.
   */
  cloudServices_tokenUrl?: string;

  /**
   * The endpoint URL for CKEditor Cloud Services uploads. This option must be set for Easy Image to work correctly.
   */
  cloudServices_uploadUrl?: string;

  /**
   * Sets GeSHi URL which, once queried with Ajax, will return highlighted code.
   */
  codeSnippetGeshi_url?: string;

  /**
   * A CSS class of the <code> element used internally for styling (by default highlight.js themes,
   * see config.codeSnippet_theme), which means that it is not present in the editor output data.
   */
  codeSnippet_codeClass?: string;

  /**
   * Restricts languages available in the "Code Snippet" dialog window. An empty value is always added to the list.
   */
  codeSnippet_languages?: any;

  /**
   * A theme used to render code snippets. See available themes.
   */
  codeSnippet_theme?: string;

  /**
   * Stores the style definition that applies the text background color.
   */
  colorButton_backStyle?: any;

  /**
   * Defines the colors to be displayed in the color selectors.
   * This is a string containing hexadecimal notation for HTML colors, without the '#' prefix.
   */
  colorButton_colors?: string;

  /**
   * Defines how many colors will be shown per row in the color selectors.
   */
  colorButton_colorsPerRow?: number;

  /**
   * Whether to enable the Automatic button in the color selectors.
   */
  colorButton_enableAutomatic?: boolean;

  /**
   * Whether to enable the More Colors button in the color selectors.
   */
  colorButton_enableMore?: boolean;

  /**
   * Stores the style definition that applies the text foreground color.
   */
  colorButton_foreStyle?: any;

  /**
   * Whether the plugin should convert background CSS properties with color only,
   * to a background-color property, allowing the Color Button plugin to edit these styles.
   */
  colorButton_normalizeBackground?: boolean;

  /**
   * The CSS file(s) to be used to apply style to editor content.
   * It should reflect the CSS used in the target pages where the content is to be displayed.
   */
  contentsCss?: string | string[];

  /**
   * The writing direction of the language which is used to create editor content.
   */
  contentsLangDirection?: string;

  /**
   * Language code of the writing language which is used to author the editor content.
   * This option accepts one single entry value in the format defined in the Tags for Identifying Languages (BCP47) IETF document and
   * is used in the lang attribute.
   */
  contentsLanguage?: string;

  /**
   * The CSS file(s) to be used to apply the style to the context menu content.
   */
  contextmenu_contentsCss?: string | string[];

  /**
   * Defines rules for the elements from which the styles should be fetched.
   * If set to true, it will disable filtering.
   */
  copyFormatting_allowRules?: string;

  /**
   * Defines which contexts should be enabled in the Copy Formatting plugin.
   */
  copyFormatting_allowedContexts?: boolean | string[];

  /**
   * Defines rules for the elements from which fetching styles is explicitly forbidden (eg. widgets).
   */
  copyFormatting_disallowRules?: string;

  /**
   * Defines the keyboard shortcut for copying styles.
   */
  copyFormatting_keystrokeCopy?: number;

  /**
   * Defines the keyboard shortcut for applying styles.
   */
  copyFormatting_keystrokePaste?: number;

  /**
   * Defines if the "disabled" cursor should be attached to the whole page when the Copy Formatting plugin is active.
   */
  copyFormatting_outerCursor?: boolean;

  /**
   * The style definition that applies the bold style to the text.
   */
  coreStyles_bold?: any;

  /**
   * The style definition that applies the italics style to the text.
   */
  coreStyles_italic?: any;

  /**
   * The style definition that applies the strikethrough style to the text.
   */
  coreStyles_strike?: any;

  /**
   * The style definition that applies the subscript style to the text.
   */
  coreStyles_subscript?: any;

  /**
   * The style definition that applies the superscript style to the text.
   */
  coreStyles_superscript?: any;

  /**
   * The style definition that applies the underline style to the text.
   */
  coreStyles_underline?: any;

  /**
   * The URL path to the custom configuration file to be loaded.
   */
  customConfig?: string;

  /**
   * The characters to be used for indenting HTML output produced by the editor.
   */
  dataIndentationChars?: string;

  /**
   * The language to be used if the language setting is left empty and it is not possible to localize the editor to the user language.
   */
  defaultLanguage?: string;

  /**
   * A setting that stores CSS rules to be injected into the page with styles to be applied to the tooltip element.
   */
  devtools_styles?: string;

  /**
   * A function that returns the text to be displayed inside the Developer Tools tooltip when hovering over a dialog UI element.
   */
  devtools_textCallback?: Function;

  /**
   * The color of the dialog background cover. It should be a valid CSS color string.
   */
  dialog_backgroundCoverColor?: string;

  /**
   * The opacity of the dialog background cover. It should be a number within the range [0.0, 1.0].
   */
  dialog_backgroundCoverOpacity?: number;

  /**
   * The guideline to follow when generating the dialog buttons.
   */
  dialog_buttonsOrder?: string;

  /**
   * The distance of magnetic borders used in moving and resizing dialogs, measured in pixels.
   */
  dialog_magnetDistance?: number;

  /**
   * Tells if user should not be asked to confirm close, if any dialog field was modified.
   */
  dialog_noConfirmCancel?: boolean;

  /**
   * If the dialog has more than one tab, put focus into the first tab as soon as dialog is opened.
   */
  dialog_startupFocusTab?: boolean;

  /**
   * Disables the built-in spell checker if the browser provides one.
   */
  disableNativeSpellChecker?: boolean;

  /**
   * Disables the "table tools" offered natively by the browser (currently Firefox only) to perform quick table editing operations,
   * like adding or deleting rows and columns.
   */
  disableNativeTableHandles?: boolean;

  /**
   * Disables the ability to resize objects (images and tables) in the editing area.
   */
  disableObjectResizing?: boolean;

  /**
   * Disables inline styling on read-only elements.
   */
  disableReadonlyStyling?: boolean;

  /**
   * Disallowed content rules.
   */
  disallowedContent?: any;

  /**
   * Whether to wrap the entire table instead of individual cells when creating a <div> in a table cell.
   */
  div_wrapTable?: boolean;

  /**
   * Sets the DOCTYPE to be used when loading the editor content as HTML.
   */
  docType?: string;

  /**
   * A CSS class applied to all Easy Image widgets. If set to null, all <figure> elements are converted into widgets.
   */
  easyimage_class?: string | null;

  /**
   * The default style to be applied to Easy Image widgets, based on keys in easyimage_styles.
   */
  easyimage_defaultStyle?: string | null;

  /**
   * Custom styles that could be applied to the Easy Image widget.
   */
  easyimage_styles?: any;

  /**
   * A list of buttons to be displayed in the balloon toolbar for the Easy Image widget.
   */
  easyimage_toolbar?: string[] | string;

  /**
   * The e-mail address anti-spam protection option.
   */
  emailProtection?: string;

  /**
   * A template for the URL of the provider endpoint.
   */
  embed_provider?: string;

  /**
   * Address of the JSON file containing the emoji list.
   */
  emoji_emojiListUrl?: string;

  /**
   * A number that defines how many characters are required to start displaying emoji's autocomplete suggestion box.
   */
  emoji_minChars?: number;

  /**
   * Whether to enable the context menu.
   */
  enableContextMenu?: boolean;

  /**
   * Allow context-sensitive Tab key behaviors,
   * including the following scenarios:
   */
  enableTabKeyTools?: boolean;

  /**
   * Sets the behavior of the Enter key.
   */
  enterMode?: number;

  /**
   * Whether to use HTML entities in the editor output.
   */
  entities?: boolean;

  /**
   * A comma-separated list of additional entities to be used. Entity names or numbers must be used in a form that excludes the '&amp;' prefix and the ';' ending.
   */
  entities_additional?: string;

  /**
   * Whether to convert some symbols, mathematical symbols, and Greek letters to HTML entities.
   */
  entities_greek?: boolean;

  /**
   * Whether to convert some Latin characters (Latin alphabet No. 1, ISO 8859-1) to HTML entities.
   */
  entities_latin?: boolean;

  /**
   * Whether to convert all remaining characters not included in the ASCII character table to their relative decimal numeric representation of HTML entity.
   */
  entities_processNumerical?: boolean | string;

  /**
   * This option makes it possible to set additional allowed content rules for CKEDITOR.editor.filter.
   */
  extraAllowedContent?: any | string;

  /**
   * A list of additional plugins to be loaded. This setting makes it easier to add new plugins without having to touch the plugins setting.
   */
  extraPlugins?: string | string[];

  /**
   * The default file name (without extension) that will be used for files created from a Base64 data string (for example for files pasted into the editor).
   * This name will be combined with the MIME type to create the full file name with the extension.
   */
  fileTools_defaultFileName?: string;

  /**
   * Allows to add extra headers for every request made using the CKEDITOR.fileTools API.
   */
  fileTools_requestHeaders?: any;

  /**
   * The location of an external file manager that should be launched when the Browse Server button is pressed.
   */
  filebrowserBrowseUrl?: string;

  /**
   * The location of an external file browser that should be launched when the Browse Server button is pressed in the Flash dialog window.
   */
  filebrowserFlashBrowseUrl?: string;

  /**
   * The location of an external file manager that should be launched when the Browse Server button is pressed in the Link tab of the Image dialog window.
   */
  filebrowserImageBrowseLinkUrl?: string;

  /**
   * The location of an external file manager that should be launched when the Browse Server button is pressed in the Image dialog window.
   */
  filebrowserImageBrowseUrl?: string;

  /**
   * The location of the script that handles file uploads in the Image dialog window.
   */
  filebrowserImageUploadUrl?: string;

  /**
   * Defines a preferred option for file uploading in the File Browser plugin.
   */
  filebrowserUploadMethod?: string;

  /**
   * The location of the script that handles file uploads.
   */
  filebrowserUploadUrl?: string;

  /**
   * The features to use in the file manager popup window.
   */
  filebrowserWindowFeatures?: string;

  /**
   * The height of the file manager popup window.
   */
  filebrowserWindowHeight?: number | string;

  /**
   * The width of the file manager popup window.
   */
  filebrowserWindowWidth?: number | string;

  /**
   * Whether a filler text (non-breaking space entity — &nbsp;) will be inserted into empty block elements in HTML output.
   */
  fillEmptyBlocks?: boolean | Function;

  /**
   * Defines the style to be used to highlight results with the find dialog.
   */
  find_highlight?: any;

  /**
   * Add <embed> tag as alternative: <object><embed></embed></object>.
   */
  flashAddEmbedTag?: boolean;

  /**
   * Use flashEmbedTagOnly and flashAddEmbedTag values on edit.
   */
  flashConvertOnEdit?: boolean;

  /**
   * Save as <embed> tag only. This tag is unrecommended.
   */
  flashEmbedTagOnly?: boolean;

  /**
   * Along with floatSpaceDockedOffsetY it defines the amount of offset (in pixels) between the float space and the editable left/right
   * boundaries when the space element is docked on either side of the editable.
   */
  floatSpaceDockedOffsetX?: number;

  /**
   * Along with floatSpaceDockedOffsetX it defines the amount of offset (in pixels) between the float space and the editable top/bottom
   * boundaries when the space element is docked on either side of the editable.
   */
  floatSpaceDockedOffsetY?: number;

  /**
   * Along with floatSpacePinnedOffsetY it defines the amount of offset (in pixels) between
   * the float space and the viewport boundaries when the space element is pinned.
   */
  floatSpacePinnedOffsetX?: number;

  /**
   * Along with floatSpacePinnedOffsetX it defines the amount of offset (in pixels) between the float space and
   * the viewport boundaries when the space element is pinned.
   */
  floatSpacePinnedOffsetY?: number;

  /**
   * Indicates that the float space should be aligned to the right side of the editable area rather than to the left (if possible).
   */
  floatSpacePreferRight?: boolean;

  /**
   * The text to be displayed in the Font Size combo is none of the available values matches the current cursor position or text selection.
   */
  fontSize_defaultLabel?: string;

  /**
   * The list of fonts size to be displayed in the Font Size combo in the toolbar.
   */
  fontSize_sizes?: string;

  /**
   * The style definition to be used to apply the font size in the text.
   */
  fontSize_style?: any;

  /**
   * The text to be displayed in the Font combo is none of the available values matches the current cursor position or text selection.
   */
  font_defaultLabel?: string;

  /**
   * The list of fonts names to be displayed in the Font combo in the toolbar.
   */
  font_names?: string;

  /**
   * The style definition to be used to apply the font in the text.
   */
  font_style?: any;

  /**
   * Forces the use of enterMode as line break regardless of the context.
   */
  forceEnterMode?: boolean;

  /**
   * Whether to force all pasting operations to insert plain text into the editor,
   * losing any formatting information possibly available in the source text.
   */
  forcePasteAsPlainText?: boolean | string;

  /**
   * Whether to force using '&' instead of '&amp;' in element attributes values.
   */
  forceSimpleAmpersand?: boolean;

  /**
   * The style definition to be used to apply the Address format.
   */
  format_address?: any;

  /**
   * The style definition to be used to apply the Normal (DIV) format.
   */
  format_div?: any;

  /**
   * The style definition to be used to apply the Heading 1 format.
   */
  format_h1?: any;

  /**
   * The style definition to be used to apply the Heading 2 format.
   */
  format_h2?: any;

  /**
   * The style definition to be used to apply the Heading 3 format.
   */
  format_h3?: any;

  /**
   * The style definition to be used to apply the Heading 4 format.
   */
  format_h4?: any;

  /**
   * The style definition to be used to apply the Heading 5 format.
   */
  format_h5?: any;

  /**
   * The style definition to be used to apply the Heading 6 format.
   */
  format_h6?: any;

  /**
   * The style definition to be used to apply the Normal format.
   */
  format_p?: any;

  /**
   * The style definition to be used to apply the Formatted format.
   */
  format_pre?: any;

  /**
   * A list of semicolon-separated style names (by default: tags) representing
   * the style definition for each entry to be displayed in the Format drop-down list in the toolbar.
   */
  format_tags?: string;

  /**
   * Indicates whether the content to be edited is being input as a full HTML page.
   */
  fullPage?: boolean;

  /**
   *  Enables Grammar As You Type (GRAYT) on SCAYT startup.
   */
  grayt_autoStartup?: boolean;

  /**
   * The height of the editing area that includes the editor content.
   */
  height?: number | string;

  /**
   * Whether to escape HTML when the editor updates the original input element.
   */
  htmlEncodeOutput?: boolean;

  /**
   * Whether the editor must output an empty value ('') if its content only consists of an empty paragraph.
   */
  ignoreEmptyParagraph?: boolean;

  /**
   *  CSS classes applied to aligned images.
   */
  image2_alignClasses?: string[];

  /**
   * Determines whether alternative text is required for the captioned image.
   */
  image2_altRequired?: boolean;

  /**
   * A CSS class applied to the <figure> element of a captioned image.
   */
  image2_captionedClass?: string;

  /**
   * Disables the image resizer.
   */
  image2_disableResizer?: boolean;

  /**
   * Determines whether dimension inputs should be automatically filled when the image URL changes in the Enhanced Image plugin dialog window.
   */
  image2_prefillDimensions?: boolean;

  /**
   * The URL where images should be uploaded.
   */
  imageUploadUrl?: string;

  /**
   * Determines whether dimension inputs should be automatically filled when the image URL changes in the Image plugin dialog window.
   */
  image_prefillDimensions?: boolean;

  /**
   * Padding text to set off the image in the preview area.
   */
  image_previewText?: string;

  /**
   * Whether to remove links when emptying the link URL field in the Image dialog window.
   */
  image_removeLinkByEmptyURL?: boolean;

  /**
   * A list of classes to use for indenting the contents.
   */
  indentClasses?: any[];

  /**
   * The size in indentation units of each indentation step.
   */
  indentOffset?: number;

  /**
   * The unit used for indentation offset.
   */
  indentUnit?: string;

  /**
   * Allows CKEditor to override jQuery.fn.val(). When set to true,
   * the val() function used on textarea elements replaced with CKEditor uses the CKEditor API.
   */
  jqueryOverrideVal?: boolean;

  /**
   * List of classes to use for aligning the contents.
   */
  justifyClasses?: string[];

  /**
   * A list associating keystrokes with editor commands.
   */
  keystrokes?: any[];

  /**
   * The user interface language localization to use.
   */
  language?: string;

  /**
   * Specifies the list of languages available in the Language plugin.
   */
  language_list?: string[];

  /**
   * Whether JavaScript code is allowed as a href attribute in an anchor tag.
   */
  linkJavaScriptLinksAllowed?: boolean;

  /**
   * Optional message for the alert popup used when the phone number in the Link dialog does not pass the validation.
   */
  linkPhoneMsg?: string;

  /**
   * Optional JavaScript regular expression used whenever phone numbers in the Link dialog should be validated.
   */
  linkPhoneRegExp?: RegExp;

  /**
   * Whether to show the Advanced tab in the Link dialog window.
   */
  linkShowAdvancedTab?: boolean;

  /**
   * Whether to show the Target tab in the Link dialog window.
   */
  linkShowTargetTab?: boolean;

  /**
   * Defines the color of the magic line.
   */
  magicline_color?: string;

}
