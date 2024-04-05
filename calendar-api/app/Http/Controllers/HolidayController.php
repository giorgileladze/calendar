<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHolidayRequest;
use App\Http\Requests\UpdateHolidayRequest;
use App\Http\Resources\HolidayCollection;
use App\Http\Resources\HolidayResource;
use App\Models\Holiday;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $startMonth = $request->query('start');
        $endMonth = $request->query('end');

        if(empty($startMonth)){
            return new HolidayCollection(Holiday::all());
        }

        $endYear = '2024';
        if($endMonth == '13'){
            $endMonth = '1';
            $endYear = '2025';
        }

        $start = Carbon::parse('2024' . '-' . $startMonth . '-1');
        $end = Carbon::parse($endYear . '-' . $endMonth . '-1');

        $holidays = Holiday::whereDate('date', '>=', $start)
            ->whereDate('date', '<', $end)
            ->get();
        
        return new HolidayCollection($holidays);
    }

    /**
     * Display the specified resource.
     */
    public function show(Holiday $holiday)
    {
        return new HolidayResource($holiday);
    }
}
