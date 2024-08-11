import React from 'react'
import ShopInfo from '../../components/shop/ShopInfo';
import ShopProfileData from '../../components/shop/ShopProfileData';
import Container from '../../util/Container';

const ShopPreviewPage = () => {
  return (
    <Container styles={"grid md:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr] md:h-screen"}>
      <div className="bg-[#fff] rounded-[4px] shadow-sm md:overflow-y-auto md:h-screen hide-scrollbar ">
        <ShopInfo isOwner={false} />
      </div>
      <div className="rounded-[4px] md:overflow-y-auto md:h-screen hide-scrollbar ">
        <ShopProfileData isOwner={false} />
      </div>
    </Container>
  )
}

export default ShopPreviewPage