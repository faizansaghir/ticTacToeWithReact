# Overview
Repository to record development and leanings related to development of Tic-Tac-Toe game with ReactJS

# Notes
1. **Public directory in root**  
The content inside `public` directory present in root folder is available in the root directory post compilation of code.  
These assets or files can therefore be directly referenced in any file like `.html`, `.css` or React Component without `./public` prefix.  
    - *Any file in public folder can be access using `[URL]/[assetName].[extensionName]`*  
    - *We can also stores files such as images in `src/assets` directory. These will not be publically available to access using `[URL]/src/assets/[assetName].[extensionName]` as these are dynamically loaded when they are referenced inside a component and kind of injected into the `public` folder. Links are automatically generated and used at referenced place*
