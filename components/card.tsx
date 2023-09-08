import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

import { ItemType, Movie } from '@/types/movie-result'
import {
  dateFormatter,
  getPosterImageURL,
  itemRedirect,
  numberRounder,
} from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

interface CardProps {
  item: Movie
  itemType?: ItemType
}

export const Card = ({ item, itemType = 'movie' }: CardProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`${itemRedirect(itemType)}/${item.id}`}>
          <div className="group relative">
            <Image
              src={`${getPosterImageURL(item.poster_path)}`}
              alt="Movie"
              width={250}
              height={375}
              className="w-full cursor-pointer rounded-md object-cover shadow-xl"
            />
          </div>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="/personal-logo.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">
                {item.title} ({item.release_date.slice(0, 4)})
              </h4>
              <Badge>{numberRounder(item.vote_average)}</Badge>
            </div>
            <p className="text-sm">
              {item.overview.length > 100 ? (
                <>{item.overview.slice(0, 100)}...</>
              ) : (
                item.overview
              )}
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
              <span className="text-xs text-muted-foreground">
                {dateFormatter(item.release_date, true)}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
