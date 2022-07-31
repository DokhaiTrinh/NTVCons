import React, { Component } from 'react'
import SearchBar from './SearchBar';
import '../styles/ChatPage.styles.css';
import Conversation from './Conversation';
export default class MsgBox extends Component {
  render() {
    return (
      <div className="left">
          <SearchBar/>
          <Conversation/>
      </div>
    )
  }
}
