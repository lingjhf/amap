import axios from 'axios'

export async function getDistrict({ keywords, subdistrict = 1, extensions = 'base' }: {
  keywords: string;
  subdistrict?: number;
  extensions?: string;
}) {
  const response = await axios.get(
    'https://restapi.amap.com/v3/config/district',
    {
      params: {
        key: 'c1933778e5a126047a51c12b509bc3b6',
        keywords,
        subdistrict,
        extensions,
      },
    }
  )
  return response.data.districts
}
