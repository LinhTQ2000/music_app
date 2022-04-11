import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";

import Block from "../component/Common/Block";
import BlockHeader from "../component/Common/BlockHeader";
import InfiniteScroll from "../component/Common/InfiniteScroll";
import SkeletonBlocks from "../component/Skeleton/SkeletonBlocks";
import { connectNewReleases } from "../containers/Album/NewReleasesContainer";
import useNewReleases from "../hook/useNewReleases";

function NewReleases() {
  const {
    data: { pending, loadMorePending, total, items, error },
    actions,
  } = useNewReleases();
  useEffect(() => {
    actions.loadNewReleases();
  }, []);

  const loadMore = () => actions.loadMoreNewReleases(items.length);
  // componentDidMount() {
  //   const { newReleases, loadNewReleases } = this.props;
  //   window.scrollTo(0, 0);
  //   if (!newReleases.items.length) {
  //     loadNewReleases();
  //   }
  // }

  // render() {
  //   const { pending, loadMorePending, total, items, error } =
  //     this.props.newReleases;
  //   const loadMore = () => this.props.loadMore(items.length);
  //   if (pending || error) {
  //     return <SkeletonBlocks />;
  //   }
  return pending || error ? (
    <SkeletonBlocks />
  ) : (
    <section>
      <BlockHeader title="New Releases" />
      <InfiniteScroll
        total={total}
        dataLength={items.length}
        loadData={loadMore}
        pending={loadMorePending}
      >
        <div className="blocks-container">
          {items.map((item, index) => {
            return (
              <Block
                key={item.id}
                type="album"
                id={item.id}
                meta={item.meta}
                name={item.name}
                image={item.image}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
  // }
}

// NewReleases.propTypes = {
//   newReleases: PropTypes.object.isRequired,
//   loadNewReleases: PropTypes.func.isRequired,
//   loadMore: PropTypes.func.isRequired,
// };

// export default connectNewReleases(NewReleases);
export default NewReleases;
