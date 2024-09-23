<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithColumnFormatting;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use Maatwebsite\Excel\Concerns\WithMapping;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class PolicySimpleExport extends DefaultValueBinder implements WithCustomValueBinder, FromCollection, WithHeadings
{

    private $collection;

    public function __construct($pts)
    {
        $this->collection = $pts;
    }

    public function bindValue(Cell $cell, $value)
    {
        $numericalColumns = ['F', 'G', 'M'];

        if (in_array($cell->getColumn(), $numericalColumns) || $value == '' || $value == null) {
            $cell->setValueExplicit($value, DataType::TYPE_STRING);
            return true;
        }

        //  $dateColumns = ['D', 'L', 'R', 'Y', 'Z'];
        // if (in_array($cell->getColumn(), $dateColumns) || $value == '' || $value == null) {
        //     $cell->setValueExplicit($value, NumberFormat::FORMAT_DATE_DDMMYYYY);
        //     return true;
        // }

        // if (in_array($cell->getColumn(), $numericalColumns)) {
        //     $cell->setValueExplicit((float) $value, DataType::TYPE_NUMERIC);

        //     return true;
        // }

        // else return default behavior
        return parent::bindValue($cell, $value);
    }

    public function headings(): array
    {
        return [
            'ID',
            'Policy No',
            'Invoice No',
            'Invoice Date',
            'Name',
            'IC',
            'Phone',
            'Vehicle',
            'Year',
            'Reg Date',
            'Reg No',
            'Chassis No',
            'Engine No',
            'Plan',
            'Period',
            'Additional year',
            'Activate date',
            'Expired date',
            'Dealer',
            'Salesman',
            'M.O',
            'Status',
            'Payment status',
            'NETT paid (RM)',
            'SSM (RM)',
            'Price (RM)',
            'Paid (RM)',
            'Paid at',
            'Outstanding (RM)',
            'Overpaid (RM)',
        ];
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->collection;
    }
}
