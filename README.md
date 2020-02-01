Example React app deployed to Heroku

Tech stack:
* React
* Redux
* Typescript
* [json-server](https://www.npmjs.com/package/json-server) 
for mock backend deployed [here](https://ts-react-redux-backend-123936.herokuapp.com), 
source code [here](https://github.com/alias8/ts-react-redux-example-backend).
* Frontend (this repo) deployed [here](https://ts-react-redux-frontend-123936.herokuapp.com).

#Login with: 

username: user0 password: user0

username: user1 password: user1

NotCompleted:
2. CSS requires some refining

3. Currently login uses cleartext passwords, obviously
would be using salted hashed passwords in production

Technical decisions made:
- The redux actions and reducers use a lot of boilerplate
types, this might seem overkill for this small project
but I have found it to be worth it when projects get much bigger
and have many contributors
- Implement prettier/linting/typechecking scripts
so that each pull request can run these in a CI/CD pipeline
- The pages/components directories are quite messy, and perhaps
some of the files could reuse each other's code. A lot of components are
using redux and internal state, and we should try to reduce this.
- Kept the redux store [normalised](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape).
- Could have used [MobX](https://www.npmjs.com/package/mobx) instead of redux.
This was a small project and would have saved time.
- Used material-ui for the CSS, as CSS can take a huge amount
of development time.
- Did not use hooks since I have not studied them enough to be
confident to quickly write this project with them.
