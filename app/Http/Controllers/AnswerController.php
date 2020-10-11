<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Statamic\Facades\Entry;

class AnswerController extends Controller
{
    public function __invoke(Request $request)
    {
        $answer = Entry::find($request->id)->get('answer');

        return [
            'correct' => $answer == $request->answer,
            'answer' => $answer,
        ];
    }
}
