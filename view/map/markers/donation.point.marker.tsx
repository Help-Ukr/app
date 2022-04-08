import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { donationMarkerIcon } from '~/lib/markers';
import { DonationPoint } from '~/model/donationpoint.model';
import { app } from '~/services/app';
import { AppUIService } from '~/services/appui.service';
import { DontationPointsService } from '~/services/donationpoints.service';
import { DonationPointDetails } from './donation.point.details';

export const DonationPointMarker = observer<{ pt: DonationPoint }>(({ pt }) => {
    const refMarker = useRef<L.Marker>(null);
    const ptsvc = app.get(DontationPointsService);
    const appUi = app.get(AppUIService);
    const isMobile = appUi.useIsMobile();

    useEffect(
        () =>
            autorun(() => {
                if (ptsvc.selected?.id === pt.id) {
                    refMarker.current?.openPopup();
                } else {
                    if (refMarker.current?.isPopupOpen()) {
                        refMarker.current?.closePopup();
                    }
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <Marker
            ref={refMarker}
            key={pt.id}
            position={[pt.location.latitude, pt.location.longitude]}
            icon={donationMarkerIcon}
        >
            <Popup
                autoPanPaddingTopLeft={isMobile ? [50, 100] : [450, 100]}
                autoPanPaddingBottomRight={isMobile ? [50, 50] : [50, 50]}
                onClose={() => ptsvc.selected === pt && ptsvc.setSelected(undefined)}
                onOpen={() => ptsvc.setSelected(pt)}
            >
                <DonationPointDetails pt={pt} />
            </Popup>
        </Marker>
    );
});
