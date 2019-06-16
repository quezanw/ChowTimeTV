import React from 'react';
import { connect } from 'react-redux';
// import { upvote } from '../../actions';
import reddit from '../../apis/reddit';
import ReactHtmlParser from 'react-html-parser';
import './VideoDetail.scss';

class VideoDetail extends React.Component {
  // decodes escaped html
  htmlDecode(input) {
    let e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  };

  renderVotes() {
    const video = this.props.selectedVideo;
    let arrowClass= "fas fa-arrow-circle-right"
    let uparrowClass = `
      ${arrowClass} 
      ${ video.likes === true ? 'orangeArrow' : '' }`;
    let downarrowClass = `
      ${arrowClass} 
      ${ video.likes === false ? 'blueArrow' : '' }`;
    if(this.props.isSignedIn) {
      return (
        <div className="col">
          <i 
            onClick={(event) => this.submitUpvote(video.id, event)} 
            id="uparrow" 
            className={uparrowClass}></i>
          <p className="likes">{video.score}</p>
          <i 
            onClick={(event) => this.submitDownvote(video.id, event)} 
            id="downarrow" 
            className={downarrowClass}></i>             
        </div>

      );
    }
    return (
      <div className="col">
        <p className="likes">{video.score}</p>
      </div>

    );
  }

  submitDownvote(postID, event) {
    let downArrow = event.target;
    let likes = parseInt(downArrow.parentNode.children[1].innerHTML);
    let numLikes;
    if(!downArrow.classList.contains('blueArrow')) {
      reddit.post('/downvote', {postID:postID});
      let upArrow = downArrow.parentNode.children[0];
      downArrow.classList.add('blueArrow');
      if(upArrow.classList.contains('orangeArrow')) {
        numLikes = likes - 2;
        upArrow.classList.remove('orangeArrow');
      } else {
        numLikes = likes - 1;
      }
    } else {
      downArrow.classList.remove('blueArrow');
      numLikes = likes + 1;
    }
    likes.innerHTML = numLikes;
  }
  // add like score into redux store - adding a score then logging out doesn't keep the changed score
  submitUpvote(postID, event) {
    let upArrow = event.target;
    let likes = parseInt(upArrow.parentNode.children[1].innerHTML);
    let numLikes;
    if(!upArrow.classList.contains('orangeArrow')) {
      reddit.post('/upvote', {postID:postID});
      let downArrow = upArrow.parentNode.children[2];
      upArrow.classList.add('orangeArrow');
      if(downArrow.classList.contains('blueArrow')) {
        downArrow.classList.remove('blueArrow');
        numLikes = likes + 2;
      } else {
        numLikes = likes + 1;
      }
    } else {
      upArrow.classList.remove('orangeArrow');
      numLikes = likes - 1;
    }
    likes.innerHTML = numLikes;
  }

  render() {
    const video = this.props.selectedVideo;
    if (!video) {
      return ( 
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading...</div>
        </div>
      )
    }
    const iFrameHTML = video['secure_media']['oembed']['html'];
    const redditLink = `https://www.reddit.com/${video.permalink}`;
    return (
      <div className="video-detail-container">
        <div className="video ui embed">
          {ReactHtmlParser(iFrameHTML)}
          {/* {ReactHtmlParser(this.htmlDecode(iFrameHTML))} */}
        </div>
        <div className="video-info">
          <h2>{video.title}</h2>
          <div className="row">
            <a href={redditLink} rel="noopener noreferrer" target="_blank">
              <i className="fab fa-reddit"></i>
            </a>
            {this.renderVotes()}
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { 
    selectedVideo: state.selectedVideo,
    isSignedIn: state.isSignedIn.isSignedIn 
  };
}

export default connect(mapStateToProps)(VideoDetail);