import { Image } from 'antd'
import { useState } from 'react'
import { IStatus } from '../service/store/product'
import { v4 as uuidv4 } from 'uuid'
import { convertToClientTimezone } from '../utils'

export function Timeline({ timeline }: { timeline: IStatus[] }) {
  const [modelVisible, setModelVisible] = useState<number>(-1)
  return (
    <div className='flow-root'>
      <ul role='list' className='-mb-8'>
        {timeline &&
          timeline.map((event, eventIdx) => (
            <li key={uuidv4()}>
              <div className='relative pb-8'>
                {eventIdx !== timeline.length - 1 ? (
                  <span
                    aria-hidden='true'
                    className='absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200'
                  />
                ) : null}
                <div className='relative flex space-x-3'>
                  <div className='flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white  border-green1 border-4 bg-white'></div>
                  <div className='min-w-0 flex-1 justify-between pt-1.5 grid lg:grid-cols-2 gap-2 lg:gap-5'>
                    <div>
                      <div className='text-lg font-semibold flex justify-between'>
                        {convertToClientTimezone(
                          event.time.toString(),
                          'yyyy-MM-dd HH:mm'
                        )}
                      </div>
                      <div className='text-base mt-2'>{event.desc}</div>
                    </div>
                    <div
                      className='w-full aspect-video rounded-2xl overflow-hidden group relative cursor-pointer'
                      onClick={() => setModelVisible(eventIdx)}
                    >
                      <Image.PreviewGroup
                        items={event.img || []}
                        preview={{
                          visible: modelVisible === eventIdx,
                          onVisibleChange: (value) =>
                            setModelVisible(value ? eventIdx : -1)
                        }}
                      >
                        <img
                          src={event.img[0]}
                          className='h-full w-full object-cover scale-105'
                        />
                        <div className='bg-black bg-opacity-40 group-hover:flex hidden h-full w-full absolute top-0 right-0 transition-all items-center justify-center text-white font-medium text-base'>
                          View all
                        </div>
                      </Image.PreviewGroup>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
