import React, { Component } from 'react';
import './App.css';
import {passageA,passageB,passageC,errorHandle} from './constants';
const axios = require('axios');
const background = require('./images/ml.jpg');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      showOverlay: false,
      answer: '',
      userInput: '',
      count: 0,
      errorClass: '',
      readMore: {
        passageA: false,
        passageB: false,
        passageC: false
      },
      showAnswers: {
        answer1: false,
        answer2: false,
        answer3: false
      },
      showServiceErrorPopup: false,
      disabled: '',
      contentId: 1,
      errorHead: '',
      errorSubHead: ''
    };
    this.sendQuestion = this.sendQuestion.bind(this);
    this.showOverlay = this.showOverlay.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.setUserInput = this.setUserInput.bind(this);
    this.removeError = this.removeError.bind(this);
    this.noAction = this.noAction.bind(this);
  }

  showOverlay(content_id){
    this.setState({
     showOverlay: true,
     contentId: content_id
    });
  }

  hideOverlay(e){
    this.setState({
      showOverlay: false,
      answer: '',
      errorClass: '',
      showServiceErrorPopup: false,
      disabled: '',
      userInput: '',
      showAnswers: {
        answer1: false,
        answer2: false,
        answer3: false
      }
    });
  }

  async sendQuestion(){
    if(this.state.userInput && this.state.contentId == 1){
      this.setState({
        errorClass: '',
        disabled: 'disabled'
      });
      const host = 'http://35.190.173.43:5000';
      const path = '/autaml/answer/';

      let formData = new FormData();
      formData.append('question', this.state.userInput);
      formData.append('content_id',this.state.contentId);
      const config = {
        headers: {
          'Cache-Control': 'no-cache',
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      };
      var this2 = this;
      axios.post(`${host}${path}`, formData, config).then((resp) => {
        let showServiceErrorPopup, disabled, answer, userInput, errorHead, errorSubHead;
        if(resp && resp.isError){
          showServiceErrorPopup = true;
          disabled = '';
          userInput = '';
          errorHead = errorHandle.serviceDown,
          errorSubHead = errorHandle.serviceDownSubtext
        }else{
          showServiceErrorPopup = false,
          answer = resp.data,
          disabled = '',
          userInput = '',
          errorHead = '',
          errorSubHead = ''
        }
        this2.setState({
          showServiceErrorPopup,
          answer,
          disabled,
          userInput,
          errorSubHead,
          errorHead
        });
      }).catch((err) => {
        this2.setState({
          showServiceErrorPopup: true,
          answer: '',
          disabled: '',
          userInput: '',
          errorHead: errorHandle.serviceDown,
          errorSubHead: errorHandle.serviceDownSubtext
        });
      });

    }else if(this.state.userInput && this.state.content_id != 1){
      this.setState({
        showServiceErrorPopup: true,
        answer: '',
        disabled: '',
        userInput: '',
        errorHead: errorHandle.contentNotSupported,
        errorSubHead: errorHandle.contentNotSupportedSubHead
      });
    }else{
      this.setState({
        errorClass: 'errorClass',
        disabled: '',
      });
    }
  }

  setUserInput(e){
    this.setState({
      userInput: e.target.value,
      errorClass: ''
    });
  }

  removeError(){
    this.setState({
      errorClass: ''
    });
  }

  noAction(e){
    console.log(e);
  }

  render() {
    const {showOverlay,answer,errorClass,readMore,showServiceErrorPopup,disabled,errorHead,errorSubHead,showAnswers} = this.state;
    return (
        <div className="flex col p20">
          <img src={background} className="background-img" alt=""/>

          <div className="container fullWidth flex row">
            <div className="flex col">
              <div className="header">
                <div className="bb mb10 pb10 fs18 center c222 bold">The Meissner effect</div>
                <div className="justify fs14 c666">
                  {passageA.paragraph1}
                  {
                    !readMore.passageA && <a href="#" className="link" onClick={(e)=> {
                      this.setState({
                        readMore: {
                          passageA: true
                        }
                      });
                    }}> Read more...</a>
                  }
                  {
                    readMore.passageA && <span>
                    <br/>{passageA.paragraph2}<br />
                      {passageA.paragraph3}<br/>{passageA.paragraph4}<br />
                      {passageA.paragraph5}<br/>{passageA.paragraph6}<br />
                      {passageA.paragraph7}<br/>{passageA.paragraph8}<br />
                    <a href="#" className="link" onClick={(e)=> {
                      this.setState({
                        readMore: {
                          passageA: false
                        }
                      });
                    }}> Read less...</a>
                  </span>
                  }
                </div>
              </div>
              <div className="btnWrapper" onClick={() => this.showOverlay.call(this,1)}>
                <div className="btn">
                  Ask me Anything
                </div>
              </div>
            </div>
            <div className="flex col">
              <div className="header">
                <div className="bb mb10 pb10 fs18 center c222 bold">Hima Das</div>
                <div className="justify fs14 c666">
                  {passageB.paragraph1}
                  {
                    !readMore.passageB && <a href="#" className="link" onClick={(e)=> {
                      this.setState({
                        readMore: {
                          passageB: true
                        }
                      });
                    }}> Read more...</a>
                  }
                  {
                    readMore.passageB &&  <span>
                  <br />{passageB.paragraph2}<br/>
                      {passageB.paragraph3}<br />{passageB.paragraph4}<br/>
                      {passageB.paragraph5}<br />{passageB.paragraph6}<br/>
                  <a href="#" className="link" onClick={(e)=> {
                    this.setState({
                      readMore: {
                        passageB: false
                      }
                    });
                  }}> Read less...</a>
                  </span>
                  }
                </div>
              </div>
              <div className="btnWrapper" onClick={() => this.showOverlay.call(this,2)}>
                <div className="btn">
                  Ask me Anything
                </div>
              </div>
            </div>
            <div className="flex col">
              <div className="header">
                <div className="bb mb10 pb10 fs18 center c222 bold">The Third Battle of Panipat</div>
                <div className="justify fs14 c666">
                  {passageC.paragraph1}
                  {
                    !readMore.passageC && <a href="#" className="link" onClick={(e)=> {
                      this.setState({
                        readMore: {
                          passageC: true
                        }
                      });
                    }}> Read more...</a>
                  }
                  {
                    readMore.passageC && <span>
                    <br/>{passageC.paragraph2}<br />
                      {passageC.paragraph3}<br/>{passageC.paragraph4}<br />
                      {passageC.paragraph5}<br/>
                    <a href="#" className="link" onClick={(e)=> {
                      this.setState({
                        readMore: {
                          passageC: false
                        }
                      });
                    }}> Read less...</a>
                  </span>
                  }
                </div>
              </div>
              <div className="btnWrapper" onClick={() => this.showOverlay.call(this,3)}>
                <div className="btn">
                  Ask me Anything
                </div>
              </div>
            </div>
          </div>
          {
            showOverlay &&
            <div className="overlayContainer flex row center-align">
              {
                (!answer && !showServiceErrorPopup) && <div className="overlay flex col posRel">
                    <div className="closeBtnWrapper" onClick={(e) => this.hideOverlay.call(this,e)}>
                      <div className="closeBtn">X</div>
                    </div>
                    <div className="flex posRel fullWidth">
                      <input
                          placeholder="Type your question here.."
                          type="text"
                          onBlur={(e) => this.setUserInput.call(this,e)}
                          onFocus={this.removeError}
                          className={`input ${errorClass}`}
                      />
                      <div className={`circularButton ${disabled}`} onClick={this.sendQuestion}>ASK</div>
                    </div>
                  </div>
              }
              {
                  answer && <div className="flex col">
                    {
                      answer.type == 'full' &&
                      <div className="flex col overlay posRel">
                        <div className="closeBtnWrapper" onClick={(e) => this.hideOverlay.call(this,e)}>
                          <div className="closeBtn">X</div>
                        </div>
                        <div className="answer f11 w90p">
                          {answer.answer}
                        </div>
                        <div className="flex row">
                          <div className="tryAgain center-align mt50" onClick={() => {this.setState({answer: '',
                            showAnswers: {
                              answer1: false,
                              answer2: false,
                              answer3: false
                            }
                          });}}>Try Again</div>
                          <div className="tryAgain center-align mt50 done"
                               onClick={(e) => this.hideOverlay.call(this,e)}>Done</div>
                        </div>
                      </div>
                    }
                    {
                      answer.type == 'partial' &&
                      <div className="flex col overlay posRel">
                        <div className="closeBtnWrapper" onClick={(e) => this.hideOverlay.call(this,e)}>
                          <div className="closeBtn">X</div>
                        </div>
                        <table className="answer f11 w100p layout"><tbody>
                          <tr className="table-row">
                            <td className="table-col table-col1 w50p left p10 bold"
                                onClick={()=>{
                                  this.setState({
                                    showAnswers : {
                                      answer1: true
                                    }
                                  })}}>
                              {answer.option_1}
                            </td>
                            <td className="table-col table-col1 w50p left p10 bold" onClick={()=>{
                              this.setState({
                                showAnswers : {
                                  answer2: true
                                }
                              })}}>{answer.option_2}</td>
                            <td className="table-col table-col1 w50p left p10 bold" onClick={()=>{
                              this.setState({
                                showAnswers : {
                                  answer3: true
                                }
                              })}}>{answer.option_3}</td>
                          </tr>
                          <tr className="table-row-2">
                            <td className="table-col w50p left p10">{showAnswers.answer1 && answer.answer_1}</td>
                            <td className="table-col w50p left p10">{showAnswers.answer2 && answer.answer_2}</td>
                            <td className="table-col w50p left p10">{showAnswers.answer3 && answer.answer_3}</td>
                          </tr>
                        </tbody></table>
                        <div className="flex row">
                          <div className="tryAgain center-align mt50" onClick={() => {this.setState({answer: '',
                            showAnswers: {
                              answer1: false,
                              answer2: false,
                              answer3: false
                            }
                          });}}>Try Again</div>
                          <div className="tryAgain center-align mt50 done"
                               onClick={(e) => this.hideOverlay.call(this,e)}>Done</div>
                        </div>
                      </div>
                    }
                  </div>
              }
              {
                (showServiceErrorPopup || (answer && !answer.type)) && <div className="flex col overlay-err posRel">
                  <div className="closeBtnWrapper" onClick={(e) => this.hideOverlay.call(this,e)}>
                    <div className="closeBtn">X</div>
                  </div>
`                 <img src={errorHandle.img} className="error-img" />
                  <div className="mt30">{errorHead ? errorHead : errorHandle.serviceDown}</div>
                  <div className="mt20">{errorSubHead ? errorSubHead : errorHandle.serviceDownSubtext}</div>
                  <div className="tryAgain center-align mt10" onClick={(e) => this.hideOverlay.call(this,e)}>OK</div>
                </div>
              }
            </div>
          }
        </div>
    );
  }
}

export default App;
