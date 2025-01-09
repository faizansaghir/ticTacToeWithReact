# Overview
Repository to record development and leanings related to development of Tic-Tac-Toe game with ReactJS

# Notes
1. **Public directory in root**  
The content inside `public` directory present in root folder is available in the root directory post compilation of code.  
These assets or files can therefore be directly referenced in any file like `.html`, `.css` or React Component without `./public` prefix.  
    - *Any file in public folder can be access using `[URL]/[assetName].[extensionName]`*  
    - *We can also stores files such as images in `src/assets` directory. These will not be publically available to access using `[URL]/src/assets/[assetName].[extensionName]` as these are dynamically loaded when they are referenced inside a component and kind of injected into the `public` folder. Links are automatically generated and used at referenced place*
2. **Updating Current State**  
    - When we want to update a state based on its previous value, we should not access the state variable directly inside the setState function, as this state update is a scheduled function call thus we might get stale value of the state variable.  
        ```jsx
            const [isEditing, setIsEditing] = useState(false)

            function handleEditClick(){
                setIsEditing(!editing)
                setIsEditing(!editing)
            }
        ```
        *The above code will change the value to `true` if currently `false` and `false` if it is currently `true`  
        This will happen as the function call to update the state is scheduled but the state has not yet changed.  
        Thus, the second function call will also be scheduled and it will get the same state value as the previous function call since the state has not yet updated*  
    - When we want to update a state based on its previous value, we should pass a function to the setState function which accepts a parameter. React populates this parameter when the scheduled function call is executed with the current state.  
        ```jsx
            const [isEditing, setIsEditing] = useState(false)

            function handleEditClick(){
                setIsEditing((editing) => !editing)
                setIsEditing((editing) => !editing)
            }
        ```
        *The above code will retirn the current value i.e. state will remain `true` if already `true` and `false` if already `false`  
        This will happen as the function call to update the state is scheduled and the current state will be passed to the function.  
        Thus, the second function call will also be scheduled and when the second function executes, it will get the latest state i.e. the state after execution of first state update function call*  
3. **Two Way Binding**  
If we have any input field and we set its `value` prop to some value that is not a state, then on trying to update this value, we will not see this value change in input field as during re-rendering, the non-state value will have the same value as it had initially.  
    ```jsx
    <input type='text' required value='Initial Value'/>
    ```
    To handle this, we can assign the initial value we want in input field to a state.  
    This state is then updated when we get any change event on the input tag.  
    The onChange handler function will by default have an `event` attribute passed to it which can be used to get the updated value using `event.target.value` and update the state variable, thus, re-rendering the component with the updated value of input field as it is associated with the updated state variable.
    ```jsx
    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    const [playerName, setPlayerName] = useState('Initial Value')
    <input type='text' required value={playerName} onChange={handleChange}/>
    ```