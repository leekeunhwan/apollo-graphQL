import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import { USERS } from "./API/graphQL/query/Users";
import { ADD_USER } from "./API/graphQL/mutation/AddUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.handleTextEdit = this.handleTextEdit.bind(this);
  }

  handleTextEdit(event) {
    this.setState({
      text: event.target.value
    });
  }

  render() {
    return (
      <div className="App" style={{ margin: "20px" }}>
        <h1>스터디용 투두 리스트</h1>
        <div style={{ display: "flex" }}>
          <input type="text" onChange={event => this.handleTextEdit(event)} />
          <Mutation
            mutation={ADD_USER}
            variables={{ name: this.state.text }}
            refetchQueries={[{ query: USERS }]}
          >
            {(addUser, { data }) => {
              console.log(data);
              return <button onClick={addUser}>등록</button>;
            }}
          </Mutation>
        </div>
        <Query query={USERS}>
          {({ loading, error, data }) => {
            if (loading) return <p>로딩중입니다..</p>;
            if (error) console.error(error);
            if (data) console.log(data);
            return data.users.map(item => (
              <React.Fragment key={item.id}>
                <div style={{ marginTop: "5px" }}>
                  <li>{item.name}</li>
                </div>
              </React.Fragment>
            ));
          }}
        </Query>
      </div>
    );
  }
}

export default App;
