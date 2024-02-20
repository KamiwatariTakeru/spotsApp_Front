// Create コンポーネント
import { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';

// props の型を指定
interface CreateProps {
  spotId: string; // または適切な型に置き換えてください
}

interface Coords {
  lat: number;
  lng: number;
}

const GoogleMap: React.FC<CreateProps> = (props) => {
  const googleMapKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || '';
  const [markers, setMarkers] = useState<Array<Coords>>([{ lat: 0, lng: 0 }]);

  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    // マーカーを設定
    markers.forEach(marker => {
      new maps.Marker({
        map,
        position: new maps.LatLng(marker.lat, marker.lng),
      });
    });
  };

  useEffect(() => {
    const fetchDefaultLatLng = async () => {
      try {
        console.log(props.spotId);
        const response = await fetch(`http://localhost:3000/spots/getCoordinate/${props.spotId}`);
        const location = await response.json();
        console.log(location.lat);
        console.log(location.lng);
        console.log('レンダリング');

        // マーカーを更新
        setMarkers([location]);
      } catch (error) {
        console.error('Error fetching default coordinates:', error);
      }
    };

    fetchDefaultLatLng();
  }, [props.spotId]);

  return (
    <div style={{ height: '300px', width: '300px' }}>
      <GoogleMapReact
        key={props.spotId}
        bootstrapURLKeys={{ key: googleMapKey }}
        center={{ lat: markers[0].lat, lng: markers[0].lng }}
        defaultZoom={16}
        onGoogleApiLoaded={handleApiLoaded}
      />
    </div>
  );
}

export default GoogleMap;
