import React, { Component } from "react";
import PropTypes from "prop-types";

import Block from "../component/Common/Block";
import BlockHeader from "../component/Common/BlockHeader";
import InfiniteScroll from "../component/Common/InfiniteScroll";
import EmptyPage from "../component/Common/Empty";
import SkeletonBlocks from "../component/Skeleton/SkeletonBlocks";
import NewPlaylistBlock from "../component/Common/NewPlaylistBlock";
import { connectUserPlaylists } from "../containers/Playlist/UserPlaylistsContainer";

export class UserPlaylists extends Component {
  componentDidMount() {
    const { playlists, loadUserPlaylists } = this.props;
    window.scrollTo(0, 0);
    if (!playlists.loaded) {
      loadUserPlaylists();
    }
  }

  renderNewPlaylistBlock = (renderContent) => {
    const { createPlaylist } = this.props;
    const { state } = this.props.history.location;
    return (
      <NewPlaylistBlock
        createPlaylist={createPlaylist}
        isNewPlaylistOpen={Boolean(state && state.newPlaylist)}
        renderContent={renderContent}
      />
    );
  };

  renderNewPlaylistBtn(submit, icon) {
    return (
      <button onClick={submit} className="empty-page__button flex-center">
        {icon} Create New Playlist
      </button>
    );
  }

  renderEmptyPage = () => {
    const newPlaylistBtn = this.renderNewPlaylistBlock(
      this.renderNewPlaylistBtn
    );
    return (
      <EmptyPage title="Create your first playlist" button={newPlaylistBtn} />
    );
  };

  render() {
    const { total, loadMorePending, pending, items, error } =
      this.props.playlists;
    const loadMore = () => this.props.loadMore(items.length);
    if (pending || error) {
      return <SkeletonBlocks />;
    }
    if (!total) {
      return this.renderEmptyPage();
    }
    return (
      <section>
        <BlockHeader title="My Playlists" />
        <InfiniteScroll
          total={total}
          dataLength={items.length}
          loadData={loadMore}
          pending={loadMorePending}
        >
          <div className="blocks-container">
            {this.renderNewPlaylistBlock()}
            {items.map((playlist, index) => {
              return (
                <Block
                  key={index}
                  type="playlist"
                  image={playlist.image}
                  name={playlist.name}
                  meta={playlist.meta}
                  id={playlist.id}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </section>
    );
  }
}

UserPlaylists.propTypes = {
  playlists: PropTypes.object.isRequired,
  loadUserPlaylists: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
};

export default connectUserPlaylists(UserPlaylists);
