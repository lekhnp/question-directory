import { trigger, transition, style, query, animateChild, animate, group } from '@angular/animations';

//import { group } from 'console';

export const pageAnimation =
  trigger('routeAnimations', [
    transition('LoginPage => SearchPage', [
      style({ position: 'relative' }),
      query(':enter', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '20px 13px'
        })
      ]),
      query(':enter', [
        style({ top: '150px', opacity: 0 })
      ]),
      group([
        query(':enter', [
          animate('300ms ease-out', style({ top: '0px', opacity: 1 }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    
    transition(`SearchPage => ResultsPage, SearchPage => DetailsPage, ResultsPage => DetailsPage,
    SearchPage => AnalyticsPage, ResultsPage => AnalyticsPage, DetailsPage => AnalyticsPage`, [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '20px 13px'
        })
      ]),
      query(':enter', [
        style({ left: '100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ left: '-100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),

    transition(`ResultsPage => SearchPage, DetailsPage => SearchPage, DetailsPage => ResultsPage,
    AnalyticsPage => SearchPage, AnalyticsPage => ResultsPage, AnalyticsPage => DetailsPage`, [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          padding: '20px 13px'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('400ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('400ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])

  ]);

  export const forAnimation = trigger('boxAnimation', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate('300ms 50ms ease-out', style({ opacity: 1, transform: 'translateY(0px)' }))
    ])
  ]);