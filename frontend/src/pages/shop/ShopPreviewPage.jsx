import React from 'react'
import ShopInfo from '../../components/shop/ShopInfo';
import ShopProfileData from '../../components/shop/ShopProfileData';
import Container from '../../util/Container';

const ShopPreviewPage = () => {
  return (
    <Container styles={"grid md:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr] py-8 gap-4"}>
      <div className="shadow-sm rounded-md bg-white h-max">
        <ShopInfo isOwner={false} />
      </div>
      <div className="rounded-[4px]">
        <ShopProfileData isOwner={false} />
      </div>
    </Container>
  )
}

export default ShopPreviewPage