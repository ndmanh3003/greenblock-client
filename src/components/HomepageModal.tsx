/* eslint-disable indent */
import { Modal } from 'antd'
import { useState } from 'react'
import { IAccount, useGetAllQuery } from '../service/store/auth'
import { useHandleError, useHandleRefetch, useHandleSuccess } from '../hooks'
import { v4 as uuidv4 } from 'uuid'

interface IHomepageModal {
  // eslint-disable-next-line no-unused-vars
  setModal: (value: string | number) => void
  modal: string | number
}

export const HomepageModal = ({ modal, setModal }: IHomepageModal) => {
  const [data, setData] = useState<IAccount[]>([])

  const {
    data: dataGetAll,
    error,
    refetch,
    isLoading
  } = useGetAllQuery({
    type: modal as 'business' | 'inspector'
  })
  useHandleError([error])
  useHandleSuccess(dataGetAll, false, (data) => setData(data))
  useHandleRefetch(refetch, [modal], () => !_roles.includes(modal as string))

  return (
    <Modal
      width={1200}
      open={modal !== 0}
      onCancel={() => setModal(0)}
      footer={() => <></>}
      zIndex={100000000}
      className='!overflow-y-auto'
    >
      <div className='text-black lg:m-5 text-base leading-loose'>
        <h1 className='text-2xl font-semibold text-green2 mb-5'>
          {_roles.includes(modal as string) || modal === 0
            ? 'Our ' + modal + 's'
            : (modal as string)
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase())}
        </h1>
        <div className='max-h-[50vh] overflow-auto'>
          {_roles.includes(modal as string) ? (
            <div className='grid lg:grid-cols-2 gap-5 pr-3'>
              {!isLoading &&
                data &&
                data.map((item) => (
                  <div
                    className='p-2 lg:p-4 rounded-xl border-2'
                    key={uuidv4()}
                  >
                    <h2 className='font-semibold !mt-0 -mb-1 text-base lg:text-lg  line-clamp-1'>
                      {item.name}
                    </h2>
                    <div className='flex justify-between items-end mt-2 text-sm lg:text-base'>
                      <a href='mailto:dđ' className='line-clamp-1 '>
                        {item.email}
                      </a>
                      <a
                        href={`${import.meta.env.VITE_GETWAY_IPFS}${item.cert}`}
                        target='_blank'
                        className='line-clamp-1'
                      >
                        View certificate
                      </a>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            _prouductInfo[modal as string]
          )}
        </div>
      </div>
    </Modal>
  )
}

const _roles = ['business', 'inspector']
const keySpan = (children: string) => (
  <span className='text-2xl font-bold'>{children}</span>
)
const _prouductInfo: { [key: string]: JSX.Element } = {
  'about-us': (
    <div>
      Welcome to GreenBlock, where innovation meets integrity. We are at the
      forefront of revolutionizing traceability in modern industries with our
      groundbreaking platform that leverages the transformative power of
      blockchain technology. Our vision is to create a more transparent and
      trustworthy world by redefining how products are tracked and verified
      across various sectors.
      <br />
      <br />
      {keySpan('🌍 Our Vision: ')} At GreenBlock, we envision a world where
      every product's journey is fully transparent and verifiable. Our goal is
      to ensure that consumers and businesses can have complete confidence in
      the integrity of products, knowing that each step of its journey is
      accurately recorded and easily accessible.
      <br />
      <br />
      {keySpan('💡 Our Mission: ')}Our mission is to set a new standard in
      product traceability by harnessing blockchain technology. We aim to
      provide a solution that not only guarantees the authenticity of products
      but also enhances overall supply chain transparency. By doing so, we
      empower businesses to build stronger relationships with their customers
      through trust and reliability.
      <br />
      <br />
      {keySpan('👥 Our Team: ')}Our team is a diverse group of industry experts,
      technology enthusiasts, and problem-solvers who are passionate about
      driving change. With a blend of deep industry knowledge and technical
      expertise, we are dedicated to delivering innovative solutions that meet
      the evolving needs of modern industries. Our commitment to excellence and
      continuous improvement drives us to push the boundaries of what’s
      possible.
    </div>
  ),
  'our-solution': (
    <div>
      GreenBlock offers a comprehensive solution designed to elevate product
      traceability to unprecedented levels. Our platform is built on the robust
      foundation of blockchain technology, providing an unmatched level of
      security, transparency, and efficiency in tracking and verifying products.
      <br />
      <br />
      {keySpan('🔗 Blockchain-Powered Traceability: ')}At the heart of our
      solution is an immutable blockchain ledger that records every detail of a
      product’s journey. This decentralized record ensures that data cannot be
      tampered with or altered, providing a transparent and unchangeable
      history. By maintaining an accurate and reliable record, GreenBlock helps
      build trust among all stakeholders in the supply chain.
      <br />
      <br />
      {keySpan('🔍 Instant Product Lookup: ')}Our platform features a powerful
      search capability that allows users to retrieve detailed product
      information instantly. By entering a unique product ID, users can access a
      comprehensive view of the product’s history, including its origin,
      handling, and any relevant certifications. This feature not only enhances
      transparency but also simplifies the verification process for both
      consumers and businesses.
      <br />
      <br />
      {keySpan('📜 Comprehensive Verification: ')}GreenBlock’s solution includes
      seamless access to blockchain-stored certificates and smart contracts.
      This feature ensures that all relevant documentation and compliance
      information are readily available, supporting thorough verification of
      product authenticity and regulatory adherence. Inspectors and businesses
      can easily validate product quality and ensure it meets required
      standards.
      <br />
      <br />
      {keySpan('🤝 Partnership Integration: ')}We understand the importance of
      collaboration in achieving comprehensive traceability. That’s why
      GreenBlock has designed an intuitive onboarding process for businesses and
      inspectors. Our platform facilitates easy registration and integration,
      allowing partners to quickly adapt and benefit from our solution. This
      streamlined approach fosters stronger partnerships and enhances the
      overall quality assurance process.
      <br />
      <br />
      {keySpan('📊 User-Friendly Dashboard: ')}The GreenBlock platform is
      equipped with an intuitive dashboard that makes managing product
      information and accounts effortless. Our user-friendly interface is
      designed to provide a seamless experience, enabling users to navigate
      through various features and access necessary data with ease. This ensures
      that managing product traceability is both efficient and straightforward.
      <br />
      <br />
      By combining state-of-the-art blockchain technology with a focus on
      user-centric design, GreenBlock is setting a new benchmark for product
      quality assurance and supply chain transparency. We are dedicated to
      providing a solution that not only meets but exceeds the expectations of
      our clients and partners. Join us in shaping the future of traceability
      and building a more transparent world for everyone.
    </div>
  ),
  'process-&-usage-guide': (
    <div>
      Navigating the GreenBlock platform is designed to be straightforward and
      user-friendly. Here's a brief overview of the process and how you can get
      started with our solution: <br /> <br />
      {keySpan('🔍 For General Users: ')} Accessing detailed product information
      is simple and efficient. All you need to do is enter the unique product ID
      into our search interface. This will instantly provide you with a
      comprehensive view of the product's history, including its origin,
      handling, and any relevant certifications. It’s designed to be intuitive,
      ensuring that users can easily verify the authenticity and traceability of
      products with just a few clicks. <br /> <br />
      {keySpan('🏢 For Businesses and Inspectors: ')} To fully leverage the
      capabilities of the GreenBlock platform, businesses and inspectors will
      need to complete a registration process. This includes onboarding to our
      system, setting up your account, and integrating with our blockchain
      ledger. Once registered, you will receive detailed guidance and support to
      ensure a smooth transition. Our team will provide you with step-by-step
      instructions and assistance tailored to your specific needs, enabling you
      to maximize the benefits of our platform. <br /> <br />
      {keySpan('📈 Getting Started: ')} Whether you are a consumer, business, or
      inspector, GreenBlock is committed to providing an easy and efficient
      experience. Our platform is designed to be accessible and straightforward,
      with resources and support available to assist you every step of the way.{' '}
      <br /> <br />
      By following these simple steps, you can start benefiting from enhanced
      traceability and transparency provided by GreenBlock. For more detailed
      instructions and support, please refer to the guidance provided upon
      registration.
    </div>
  )
}
