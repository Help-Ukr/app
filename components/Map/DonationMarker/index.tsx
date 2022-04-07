import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { donationMarkerIcon } from '~/lib/markers';
import { DonationPoint } from '~/model/donationpoint.model';
import { app } from '~/services/app';
import { DontationPointsService } from '~/services/donationpoints.service';

export const DonationMarker = observer<{ pt: DonationPoint }>(({ pt }) => {
    const refPopup = useRef<L.Marker>(null);
    const ptsvc = app.get(DontationPointsService);

    useEffect(
        () =>
            autorun(() => {
                if (ptsvc.selected?.id === pt.id) {
                    refPopup.current?.openPopup();
                } else {
                    if (refPopup.current?.isPopupOpen()) {
                        refPopup.current?.closePopup();
                    }
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <Marker
            ref={refPopup}
            key={pt.id}
            position={[pt.location.latitude, pt.location.longitude]}
            icon={donationMarkerIcon}
            eventHandlers={{ click: () => ptsvc.setSelected(pt) }}
        >
            <Popup onClose={() => ptsvc.selected === pt && ptsvc.setSelected(undefined)}>{pt.name}</Popup>
        </Marker>
    );
});
