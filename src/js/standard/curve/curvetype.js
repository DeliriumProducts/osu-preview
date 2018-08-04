function CurveType(approxLength)
{
    // https://github.com/itdelatrisu/opsu/blob/master/src/itdelatrisu/opsu/objects/curves/CurveType.java
    let points = (approxLength / 4 | 0) + 1;
    this.path = [];
    for (let i = 0; i <= points; i++)
    {
        this.path[i] = this.pointAt(i / points);
    }

    this.distance = [ 0 ];
    for (let i = 1; i <= points; i++)
    {
        this.distance[i] = this.path[i].distanceTo(this.path[i - 1]);
    }
}
CurveType.prototype.pointAt = undefined;
