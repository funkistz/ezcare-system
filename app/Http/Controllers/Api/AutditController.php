<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Policy;
use Aws\Api\Validator;
use Illuminate\Http\Request;

class AutditController extends Controller
{
    public function list(Request $request)
    {

    
        $modelName = $request->input('model_name');
        $modelId = $request->input('model_id');

        $namespace = 'App\\Models\\';
        $model = $namespace . $modelName;

        if (!class_exists($model)) {
            return response()->json(['error' => 'Model does not exist'], 400);
        }

        if (empty($modelId)) {
            return response()->json(['error' => 'Model id not found'], 400);
        }

        // Use the dynamic model to get the first record
        $article = $model::first();
        $all = $article->audits;

        // Get latest Audit
        // $audit = $article->audits()->latest()->first();
        $audit = $article->audits()->find($modelId);

        if(empty($audit)) {
            return response()->json([]);
        }

        return response()->json([$audit]);
    
    }
}
