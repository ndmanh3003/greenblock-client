import PromotionCard from '../../components/PromotionCard'
import { Carousel } from 'antd'

interface IPromotion {
  name: string
  description: string
  link: string
}

const _promotion: IPromotion[] = [
  {
    name: 'Farm-to-Table Freshness Sale',
    description:
      'Get 20% off on all organic fruits and vegetables directly sourced from local farms. Enjoy the freshest produce delivered straight to your door.',
    link: 'https://example.com/farm-to-table-sale'
  },
  {
    name: 'Harvest Festival Specials',
    description:
      'Celebrate the harvest season with exclusive discounts on a variety of seasonal products, including pumpkins, apples, and more.',
    link: 'https://example.com/harvest-festival'
  },
  {
    name: 'Healthy Living Bundle',
    description:
      'Save 15% on a curated bundle of organic and healthy food items. Perfect for starting your wellness journey.',
    link: 'https://example.com/healthy-living-bundle'
  },
  {
    name: 'Farmers Market Online',
    description:
      'Shop your favorite farmers market products online with up to 25% off. Fresh dairy, honey, and more delivered to your door.',
    link: 'https://example.com/farmers-market'
  }
]

const Promotion = () => {
  return (
    <div className='h-full w-full'>
      <main>
        <h1 className='font-bold text-3xl my-8 text-green2'>
          Special Offers from Our Partners
        </h1>
        <div>
          <Carousel
            className='overflow-hidden rounded-2xl'
            arrows
            infinite={false}
            autoplay
            draggable
            // afterChange={(current) => console.log(current)}
          >
            {_promotion.map((item, index) => (
              <PromotionCard
                key={index}
                desc={item.description}
                link={item.link}
                title={item.name}
                index={index}
              />
            ))}
          </Carousel>
        </div>
      </main>
    </div>
  )
}

export default Promotion
