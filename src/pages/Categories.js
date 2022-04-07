import React, { Component } from "react";
import PropTypes from "prop-types";

import BlockHeader from "../component/Common/BlockHeader";
import InfiniteScroll from "../component/Common/InfiniteScroll";
import Category from "../component/Common/Category";
import SkeletonCategories from "../component/Skeleton/SkeletonCategories";
import { connectCategories } from "../containers/CategoriesContainer";
import "../style/Category.scss";

export class Categories extends Component {
  componentDidMount() {
    const { categories, loadCategories } = this.props;
    window.scrollTo(0, 0);
    if (!categories.items.length) {
      loadCategories();
    }
  }

  render() {
    const { pending, total, loadMorePending, items, error } =
      this.props.categories;
    const loadMore = () => this.props.loadMore(items.length);
    if (pending || error) {
      return <SkeletonCategories preview={false} />;
    }
    return (
      <div className="categories">
        <BlockHeader title="Genres & Moods" />
        <InfiniteScroll
          total={total}
          dataLength={items.length}
          loadData={loadMore}
          pending={loadMorePending}
        >
          <div className="categories__container">
            {items.map((item, index) => {
              return (
                <Category
                  key={index}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  loadCategories: PropTypes.func.isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default connectCategories(Categories);
