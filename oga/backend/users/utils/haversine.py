from math import radians, sin, cos, asin, sqrt

def distance(loc1, loc2):
    return haversine(loc1.longitude, loc1.latitude, loc2.longitude, loc2.latitude)

# haversine formula
# from https://stackoverflow.com/questions/4913349/
# haversine-formula-in-python-bearing-and-distance-between-two-gps-points
def haversine(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points 
    on the earth (specified in decimal degrees)
    """
    # convert decimal degrees to radians 
    lon1, lat1, lon2, lat2 = map(radians, [lon1, lat1, lon2, lat2])
    # haversine formula 
    dlon = lon2-lon1 
    dlat = lat2-lat1 
    a = sin(dlat/2)**2+cos(lat1)*cos(lat2)*sin(dlon/2)**2
    c = 2 * asin(sqrt(a)) 
    r = 6371 # Radius of earth in kilometers. Use 3956 for miles
    return c * r
