import React, { Component } from 'react';
import SearchBar from './searchBar';
import Gif from './gif';
import GifList from './gifList';

const giphy = require('giphy-api')('KsltJNEs1v3QDDVlinP6EFo2GqjFxgRR');
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGif: "QCJqrutxd2cDs2ii6X",
      gifIdList: ["WuGSL4LFUMQU", "HuVCpmfKheI2Q", "u6uAu3yyDNqRq"]
    };
    this.fetchGiphy("star wars");
  }

  fetchGiphy = (keyword) => {
    giphy.search({
      q: keyword,
      rating: 'g',
      limit: 10
    }, (err, res) => {
      this.setState({ gifIdList: res.data.map(gif => gif.id) });
    });
  }

  changeSelectGif = (newSelectedGifId) => {
    this.setState({ selectedGif: newSelectedGifId });
  }

  render() {
    const { selectedGif, gifIdList } = this.state;
    return (
      <div>
        <div className="left-scene">
          <SearchBar fetchGiphy={this.fetchGiphy} />
          <div className="selected-gif">
            <Gif gifId={selectedGif} />
          </div>
        </div>
        <div className="right-scene">
          <GifList gifIdList={gifIdList} changeSelectGif={this.changeSelectGif} />
        </div>
      </div>
    );
  }
}

export default App;
